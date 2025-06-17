import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UIButton } from '../../components/UIButton';
import { UIField } from '../../components/UIField';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import {
  eraseOnboardingToken,
  getPartneroPartner,
  setKaslKey,
  setOnboardingToken,
  setSessionToken,
} from '../../utils/localStorage';
import { generateToken } from '../../utils/token';
import { InvitationType, User, UserTypes } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import { ApiFieldError } from '../../utils/api/types';
import { getApi, postApi } from '../../utils/api/api';
import { Subscription } from '../../types/billing';
import { OnboardingPages, OnboardingUrls } from '../../types/onboarding';
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from '../../utils/custom-validation';
import { Badge } from '../../components/badge/Badge';
import { FC, useEffect, useState } from 'react';
import { clearQueryString } from '../../utils/uri';
import { useApp } from '../../contexts/AppContext';

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormFooter = styled.div`
  font-family: 'Satoshi-Variable', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #888399;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.005em;
  color: #000000;
  margin-bottom: 24px;
  text-align: center;
`;

interface SignUpFormProps {
  is_mobile?: boolean;
  type?: UserTypes;
}

export const SignUpForm: FC<SignUpFormProps> = ({ is_mobile, type }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { is_public } = useApp();
  const {
    email: loginEmail,
    first_name: loginFirstName,
    last_name: loginLastName,
    user,
    fetching,
    handleGetUser,
    setEmail: setLoginEmail,
    setFirstName: setLoginFirstName,
    setLastName: setLoginLastName,
  } = useUser();

  const [checkout_session_id, setCheckoutSessionId] = useState<string>('');
  const [confirm_password, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(loginEmail);
  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [first_name, setFirstName] = useState<string>(loginFirstName);
  const [is_private_user, setIsPrivateUser] = useState<boolean>(false);
  const [last_name, setLastName] = useState<string>(loginLastName);
  const [password, setPassword] = useState<string>('');
  const [password_match, setPasswordMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [role_id, setRoleId] = useState<number>(0);
  const [admin_id, setAdminId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [plan_id, setPlanId] = useState<string>('');
  const [plan_description, setPlanDescription] = useState<string>('');

  const clearFields = () => {
    setConfirmPassword('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setPasswordMatch(false);
    setLoginEmail('');
    setLoginFirstName('');
    setLoginLastName('');
  };

  const signUp = async () => {
    setLoading(true);
    const url = type === UserTypes.USER ? 'auth/sign-up' : 'auth/admin/sign-up';
    const sign_up_params = {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      token: await generateToken(),
    };
    if (checkout_session_id.length > 0) {
      Object.assign(sign_up_params, {
        checkout_session_id,
        partnero_partner: getPartneroPartner(),
      });
    }
    if (type === UserTypes.USER) {
      Object.assign(sign_up_params, {
        type: UserTypes.USER,
        page: 'upvote',
        domain: window.location.host,
        is_private_user,
      });
    } else if (type === UserTypes.CUSTOMER) {
      Object.assign(sign_up_params, {
        role_id,
        team_owner_id: admin_id,
      });
    }
    if (plan_id.length > 0) {
      Object.assign(sign_up_params, {
        plan_description,
        plan_ids: [plan_id],
        start_free_trial: true,
      });
    }

    postApi<
      User & {
        subscription: Subscription & { trial_end: number | string | null };
      }
    >({ url, payload: sign_up_params }).then(async (res) => {
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }
      if (res.results.error && res.results.error == 'error.email.taken') {
        const error = {
          field: 'email',
          message: res.results.error,
        };
        let copy_field_errors = field_errors.filter(
          (field_error) => field_error.field !== 'email'
        );
        if (copy_field_errors.length > 0) copy_field_errors.push(error);
        else copy_field_errors = [error];
        setFieldErrors(copy_field_errors);
      }
      setLoading(false);
      if (res.results.data && res.headers['kasl-key']) {
        if (res.results.data.token) {
          setSessionToken(res.results.data.token);
        }
        clearFields();
        if (is_public) {
          setKaslKey(res.headers['kasl-key'].toString());
          await handleGetUser();
          navigate('/upvotes');
        } else {
          localStorage.removeItem('onboarding_page');
          eraseOnboardingToken();
          localStorage.removeItem('reloaded');
          const result: User & {
            subscription: Subscription & { trial_end: number | string | null };
          } = res.results.data;
          if (result.onboarding_done === undefined || result.onboarding_done) {
            setKaslKey(res.headers['kasl-key'].toString());
            await handleGetUser();
            const subscription = result.subscription;
            if (
              subscription &&
              subscription.status === 'canceled' &&
              subscription.trial_end
            ) {
              navigate('/billing');
              return;
            }
            navigate('/upvotes');
            return;
          }
          localStorage.setItem(
            'onboarding_page',
            result.onboarding_page ?? OnboardingPages.WELCOME
          );
          setOnboardingToken(res.headers['kasl-key'].toString());
          localStorage.setItem('first_name', result.first_name ?? '');
          navigate(
            OnboardingUrls[result.onboarding_page ?? OnboardingPages.WELCOME]
          );
        }
      }
    });
  };

  useEffect(() => {
    const sign_up_form = document.getElementById(
      'sign-up-form'
    ) as HTMLFormElement;
    if (sign_up_form) {
      sign_up_form.style.paddingLeft = is_mobile ? '25px' : '0';
      sign_up_form.style.paddingRight = is_mobile ? '25px' : '0';
      sign_up_form.style.paddingBottom = is_mobile ? '0' : '80px';
      sign_up_form.style.width = is_mobile ? '100%' : '400px';
    }
  }, [is_mobile]);

  useEffect(() => {
    setFirstName(loginFirstName);
    setLastName(loginLastName);
  }, [loginFirstName, loginLastName]);

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);
      if (
        typeof params['u'] === 'string' &&
        !Number.isNaN(Number(params['u'])) &&
        typeof params['k'] === 'string' &&
        typeof params['k'] === 'string' &&
        typeof params['firstName'] === 'string' &&
        typeof params['lastName'] === 'string' &&
        typeof params['email'] === 'string' &&
        typeof params['roleId'] === 'string' &&
        !Number.isNaN(Number(params['roleId']))
      ) {
        const roleId = Number(params['roleId']);
        setRoleId(roleId);
        setAdminId(Number(params['u']));
        setFirstName(params['firstName']);
        setLastName(params['lastName']);
        setEmail(params['email']);
        setIsDisabled(true);
      } else if (
        typeof params['u'] === 'string' &&
        !Number.isNaN(Number(params['u'])) &&
        typeof params['email'] === 'string' &&
        typeof params['firstName'] === 'string' &&
        typeof params['lastName'] === 'string'
      ) {
        setAdminId(Number(params['u']));
        setEmail(params['email']);
        setFirstName(params['firstName']);
        setLastName(params['lastName']);
        setIsPrivateUser(true);
        setIsDisabled(true);
      }
      if (params['session_id']) {
        const sessionId = Array.isArray(params['session_id'])
          ? params['session_id'][0] || ''
          : params['session_id'];
        setCheckoutSessionId(sessionId);
        getApi<{ first_name: string; last_name: string; email: string }>({
          url: `auth/checkout-session/${params['session_id']}`,
        }).then(async (res) => {
          if (res.results.data) {
            const data = res.results.data;
            setEmail(data.email);
          }
        });
      }
      setPlanId(params['plan']?.toString() ?? '');
      setPlanDescription(params['description']?.toString() ?? '');
      clearQueryString();
    }
  }, []);

  useEffect(() => {
    const verifyInvitation = () => {
      setVerifying(true);
      postApi({
        url: 'auth/verify-invitation',
        payload: {
          customer_id: admin_id,
          email,
          type: is_private_user
            ? InvitationType.PRIVATE_USER
            : InvitationType.TEAM_MEMBER,
        },
      })
        .then((res) => {
          setVerifying(false);
          if (res.results.error) {
            setAdminId(0);
            setEmail('');
            setFirstName('');
            setLastName('');
            setIsDisabled(false);
            toast(res.results.error, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              className: 'custom-theme',
              bodyClassName: 'p-2',
              pauseOnFocusLoss: false,
            });
          }
        })
        .catch(() => setVerifying(false));
    };

    if (admin_id > 0 && email.length > 0) {
      verifyInvitation();
    }
  }, [admin_id, email, is_private_user]);

  return (
    <div id="SignUpForm">
      <Form id="sign-up-form">
        <FormHeader>
          {!fetching && (
            <>
              {user && (
                <>
                  {user.moderation?.allow_anonymous_access === true ? (
                    <Badge variant="success" size="lg">
                      Guest login has been turned on. As a new user, you only
                      have to log in once. Once logged on, you will be assigned
                      a randomly generated name. You will not need to log in
                      again unless the admin turns off guest logging.
                    </Badge>
                  ) : (
                    <>
                      Prioritize Features with Confidence
                      <br />
                      Manage Feedback with Ease
                    </>
                  )}
                </>
              )}
            </>
          )}
        </FormHeader>
        <UIField
          error_label={
            field_errors.find(
              (field_error) => field_error.field === 'first_name'
            )?.message
          }
          id="FirstNameField"
          is_error_state={field_errors.some(
            (field_error) => field_error.field === 'first_name'
          )}
          label="First Name"
          onBlur={(e) => {
            let error;
            if (type === UserTypes.USER) {
              const validationResult = validateFullName(e.target.value);
              if (validationResult != null) {
                error = {
                  field: 'first_name',
                  message: validationResult,
                };
              }
            }
            if (error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'first_name'
              );
              if (copy_field_errors.length > 0) copy_field_errors.push(error);
              else copy_field_errors = [error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (field_error) => field_error.field !== 'first_name'
              )
            );
            setFirstName(e.target.value);
          }}
          tab_index={1}
          type="text"
          value={first_name}
        />
        <UIField
          error_label={
            field_errors.find(
              (field_error) => field_error.field === 'last_name'
            )?.message
          }
          id="LastNameField"
          is_error_state={field_errors.some(
            (field_error) => field_error.field === 'last_name'
          )}
          label="Last Name"
          onBlur={(e) => {
            let error;
            if (type === UserTypes.USER) {
              const validationResult = validateFullName(e.target.value);
              if (validationResult != null) {
                error = {
                  field: 'last_name',
                  message: validationResult,
                };
              }
            }
            if (error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'last_name'
              );
              if (copy_field_errors.length > 0) copy_field_errors.push(error);
              else copy_field_errors = [error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (field_error) => field_error.field !== 'last_name'
              )
            );
            setLastName(e.target.value);
          }}
          tab_index={1}
          type="text"
          value={last_name}
        />
        <UIField
          readOnly={isDisabled}
          error_label={
            field_errors.find((field_error) => field_error.field === 'email')
              ?.message
          }
          id="EmailAddressField"
          is_error_state={field_errors.some(
            (field_error) => field_error.field === 'email'
          )}
          label="Email Address"
          max_length={256}
          onBlur={(e) => {
            let email_address_error;
            if (e.target.value.length === 0) {
              email_address_error = {
                field: 'email',
                message: 'This is a required field.',
              };
            }
            if (!validateEmail(e.target.value)) {
              email_address_error = {
                field: 'email',
                message: 'Invalid email address.',
              };
            }
            if (email_address_error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'email'
              );
              if (copy_field_errors.length > 0)
                copy_field_errors.push(email_address_error);
              else copy_field_errors = [email_address_error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (field_error) => field_error.field !== 'email'
              )
            );
            setEmail(e.target.value);
          }}
          required={true}
          tab_index={2}
          type="email"
          value={email}
        />
        <UIField
          container_class="margin-bottom-0"
          error_label={field_errors
            .find((field_error) => field_error.field === 'password')
            ?.message.replace(
              'error.password.weak',
              'error.password.complexity'
            )
            .replace('error.password.invalid', 'error.password.complexity')
            .replace('error.password.length', 'error.password.complexity')}
          has_eye_icon={true}
          has_icon={password_match}
          id="PasswordField"
          is_error_state={field_errors.some(
            (field_error) => field_error.field === 'password'
          )}
          is_success_state={password_match}
          label="Set a Password"
          max_length={256}
          onBlur={(e) => {
            let password_error;
            if (e.target.value.length === 0) {
              password_error = {
                field: 'password',
                message: 'This is a required field.',
              };
            }
            if (!validatePassword(e.target.value)) {
              password_error = {
                field: 'password',
                message: 'error.password.complexity',
              };
            }
            if (password_error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'password'
              );
              if (copy_field_errors.length > 0)
                copy_field_errors.push(password_error);
              else copy_field_errors = [password_error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (field_error) =>
                  field_error.field !== 'password' &&
                  field_error.field !== 'confirm_password'
              )
            );
            setPasswordMatch(false);
            setPassword(e.target.value);
          }}
          placeholder="Enter password"
          required={true}
          tab_index={5}
          type="password"
          value={password}
        />
        <UIField
          error_label={field_errors
            .find((field_error) => field_error.field === 'confirm_password')
            ?.message.replace(
              'error.confirm_password.invalid',
              'error.password.complexity'
            )
            .replace(
              'error.confirm_password.length',
              'error.password.complexity'
            )}
          has_eye_icon={true}
          has_icon={password_match}
          id="ConfirmPasswordField"
          is_error_state={field_errors.some(
            (field_error) => field_error.field === 'confirm_password'
          )}
          is_success_state={password_match}
          max_length={256}
          onBlur={(e) => {
            let confirm_password_error;
            if (e.target.value.length === 0) {
              confirm_password_error = {
                field: 'confirm_password',
                message: 'This is a required field.',
              };
            }
            if (password !== confirm_password && e.target.value.length > 0) {
              confirm_password_error = {
                field: 'confirm_password',
                message: 'The passwords do not match. Please try again.',
              };
            }
            if (
              !field_errors.some(
                (field_error) => field_error.field === 'password'
              ) &&
              e.target.value.length > 0 &&
              password === e.target.value
            ) {
              setPasswordMatch(true);
            }
            if (confirm_password_error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'confirm_password'
              );
              if (copy_field_errors.length > 0)
                copy_field_errors.push(confirm_password_error);
              else copy_field_errors = [confirm_password_error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (field_error) => field_error.field !== 'confirm_password'
              )
            );
            setPasswordMatch(false);
            setConfirmPassword(e.target.value);
            if (
              !field_errors.some(
                (field_error) => field_error.field === 'password'
              ) &&
              e.target.value.length > 0 &&
              password === e.target.value
            ) {
              setPasswordMatch(true);
            }
          }}
          placeholder="Confirm password"
          required={true}
          success_label="Matched!"
          tab_index={6}
          type="password"
          value={confirm_password}
        />
        <UIButton
          disabled={
            loading ||
            first_name.length === 0 ||
            last_name.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            !password_match ||
            field_errors.length > 0
          }
          onClick={signUp}
          show_arrow={loading ? false : true}
          tab_index={7}
          text={loading ? 'Loading ...' : 'Sign up'}
        />
        <FormFooter>
          <span className="margin-bottom-32">
            Already have an account? <Link to={'/sign-in'}>Sign in</Link>
          </span>
          <span>
            By continuing, you agree to our{' '}
            <a
              style={{ textDecoration: 'none' }}
              href="https://producthq.io/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              style={{ textDecoration: 'none' }}
              href="https://producthq.io/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            , listed below.
          </span>
        </FormFooter>
      </Form>
      {verifying && <div id="VerifyPage">Verifying…</div>}
    </div>
  );
};
