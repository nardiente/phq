import { getApi, postApi } from '../../utils/api/api';
import { ApiFieldError } from '../../utils/api/types';
import {
  eraseImpersonator,
  eraseOnboardingToken,
  getSessionToken,
  setKaslKey,
  setOnboardingToken,
  setSessionToken,
} from '../../utils/localStorage';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UIButton } from '../../components/UIButton';
import { UIField } from '../../components/UIField';
import { toast } from 'react-toastify';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GitHubLogin from '../../components/Login/GithubLogin';
import { ChevronRightIcon } from '../../components/icons/chevron-right.icon';
import { UserTypes } from '../../types/user';
import { OnboardingPages, OnboardingUrls } from '../../types/onboarding';
import { UserContextConfig, useUser } from '../../contexts/UserContext';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePassword } from '../../utils/custom-validation';
import { clearQueryString } from '../../utils/uri';
import { useApp } from '../../contexts/AppContext';
import { isSuperDuperAdmin } from '../../utils/user';
import {
  designSystemItem,
  bottomMenuItems,
  mainMenuItems,
  superDuperAdminItems,
  publicViewMenuItems,
  settingsMenuItems,
} from '../../constants/menuItems';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FormHeader = styled.div`
  font-family: 'Satoshi-Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  letter-spacing: 0.005em;
  color: #000000;
  margin-bottom: 24px;
  width: 100%;
`;

// const appId = import.meta.env.FB_APP_ID || ''

interface LoginFormProps {
  is_mobile?: boolean;
  type?: UserTypes;
}

export const LoginForm = (props: LoginFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { is_public, setMenuItems } = useApp();
  const {
    setFirstName,
    setGithubCode,
    setLastName,
    setEmail: setLoginEmail,
    loading_social: login_loading_social,
    setLoadingSocial: setLoginLoadingSocial,
    showBanner,
    setShowBanner,
    handleGetUser,
    setUser,
    initialUser,
  } = useUser();

  const [bannerText, setBannerText] = React.useState<string>(
    'You have already verified your email address. Please log on to your account.'
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [field_errors, setApiFieldErrors] = React.useState<ApiFieldError[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loading_social, setLoadingSocial] = React.useState<boolean>(false);
  const [verifying, setVerifying] = React.useState<boolean>(false);
  const [hasCalledSocialLogin, setHasCalledSocialLogin] = React.useState(false);

  React.useEffect(() => {
    if (location.search.length > 0) {
      const params = queryString.parse(location.search);
      if (
        typeof params['u'] === 'string' &&
        !Number.isNaN(Number(params['u'])) &&
        typeof params['k'] === 'string'
      ) {
        setVerifying(true);
        postApi({
          url: 'auth/activate',
          payload: {
            id: parseInt(params['u']),
            activation_key: params['k'],
          },
        }).then(async (res) => {
          setVerifying(false);
          if (res.results.error) {
            setBannerText(t(res.results.error));
            if (res.results.error == 'error.account.verified') {
              setBannerText(
                'You have already verified your email address. Please log on to your account.'
              );
            }
            setShowBanner(true);
          }
          if (res.results.errors) {
            setApiFieldErrors(res.results.errors);
          }
          if (res.headers['kasl-key'] && !res.results.error) {
            if (!is_public) {
              const data = res.results.data as {
                user: { company_name: string };
              };
              const isInvitedMember = !!data.user.company_name;

              if (isInvitedMember) {
                localStorage.setItem('onboarding_page', 'add_idea');
                setOnboardingToken(res.headers['kasl-key'].toString());
                setKaslKey(res.headers['kasl-key'].toString());
                await handleGetUser();
                navigate('/upvotes');
                return;
              } else {
                localStorage.setItem('onboarding_page', 'welcome');
                setOnboardingToken(res.headers['kasl-key'].toString());
                navigate(
                  OnboardingUrls[
                    localStorage.getItem('onboarding_page') as OnboardingPages
                  ]
                );
              }
            } else {
              setKaslKey(res.headers['kasl-key'].toString());
              await handleGetUser();
              navigate('/upvotes');
            }
            return;
          }
        });
      }
      if (typeof params['a'] === 'string') {
        toast(t('success.email_verification'), {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          pauseOnFocusLoss: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          bodyClassName: 'p-2',
          className: 'custom-theme',
        });
      }
      if (params['code'] && params['state']) {
        window.location.assign(
          `http://${params['state']}/sign-in?code=${params['code']}`
        );
      } else if (params['code']) {
        setGithubCode(params['code'].toString());
      }
      if (params['sso'] && params['e'] && params['f'] && params['l']) {
        setLoginEmail(params['e'].toString());
        setFirstName(params['f'].toString());
        setLastName(params['l'].toString());
        if (!hasCalledSocialLogin) {
          setHasCalledSocialLogin(true);
          handleSocialLogin(
            params['e'].toString(),
            is_public ? window.location.host : undefined
          );
        }
      }
      clearQueryString();
    }
  }, []);

  React.useEffect(() => {
    setLoadingSocial(login_loading_social);
  }, [login_loading_social]);

  React.useEffect(() => {
    const sign_up_form = document.getElementById(
      'login-form'
    ) as HTMLFormElement;
    if (sign_up_form) {
      sign_up_form.style.paddingLeft = props.is_mobile ? '25px' : '0';
      sign_up_form.style.paddingRight = props.is_mobile ? '25px' : '0';
      sign_up_form.style.width = props.is_mobile
        ? '100%'
        : is_public
          ? '63%'
          : '500px';
    }
  }, [props.is_mobile]);

  const clearMsgs = () => {
    setApiFieldErrors([]);
  };

  const handleOnChangeEmail = (e: any) => {
    setEmail(e.target.value);
    clearMsgs();
  };

  const handleOnChangePassword = (e: any) => {
    setPassword(e.target.value);
    clearMsgs();
  };

  const handleSocialLogin = async (email: string, domain?: string) => {
    setLoginLoadingSocial(true);

    let payload: {
      email: string;
      domain?: string;
      token?: string;
      type: UserTypes;
    } = {
      email,
      domain,
      type: is_public ? UserTypes.USER : UserTypes.CUSTOMER,
    };

    if (is_public) {
      payload = { ...payload, token: getSessionToken() };
    }

    postApi<UserContextConfig>({ url: 'auth/login-social', payload })
      .then(async (res) => {
        const {
          headers,
          results: { data, error },
        } = res;
        const { subscription, user } = data ?? {};
        const { onboarding_done, onboarding_page, token } = user ?? {};
        if (error) {
          const message = error;
          if (message === 'error.invalid_credentials') {
            setLoginEmail(email);
            navigate('/sign-up');
            return;
          }
          if (message === 'error.email.unverified') {
            toast(t('success.email_verification'), {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              pauseOnFocusLoss: false,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              bodyClassName: 'p-2',
              className: 'custom-theme',
            });
            return;
          }
          toast(t(message), {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            bodyClassName: 'p-2',
            className: 'custom-theme',
          });
        }
        if (data && headers['kasl-key'] && !error) {
          eraseImpersonator();
          setKaslKey(headers['kasl-key'].toString());
          clearMsgs();
          localStorage.removeItem('onboarding_page');
          eraseOnboardingToken();
          setMenuItems(
            is_public
              ? publicViewMenuItems
              : isSuperDuperAdmin(user)
                ? superDuperAdminItems
                : [
                    ...mainMenuItems,
                    ...settingsMenuItems,
                    ...bottomMenuItems,
                    designSystemItem,
                  ]
          );
          if (token) {
            setSessionToken(token);
          }
          setUser((prev) =>
            prev ? { ...prev, ...data } : { ...initialUser, ...data }
          );
          if (onboarding_done === undefined || onboarding_done) {
            await handleGetUser();
            if (is_public) {
              navigate('/upvotes');
              return;
            }
            if (
              subscription &&
              subscription.status === 'canceled' &&
              subscription.trial_end
            ) {
              navigate('/billing');
              return;
            }
            navigate(
              isSuperDuperAdmin(user) ? '/super-duper-admin' : '/dashboard'
            );
            return;
          }
          localStorage.setItem('onboarding_page', onboarding_page ?? '');
          setOnboardingToken(headers['kasl-key'].toString());
          navigate(
            OnboardingUrls[
              localStorage.getItem('onboarding_page') as OnboardingPages
            ]
          );
        }
      })
      .finally(() => setLoginLoadingSocial(false));
  };

  const loginGoogle = async () => {
    setLoadingSocial(true);
    getApi({
      url: 'auth/google-auth-url',
      params: { d: window.location.host },
    })
      .then((res) => {
        if (res.results.data) {
          window.location.assign(res.results.data as string);
        }
      })
      .finally(() => setLoadingSocial(false));
  };

  const onSubmit = async () => {
    setLoading(true);
    const login_params = {
      email: email,
      password: password,
      type: is_public ? UserTypes.USER : UserTypes.CUSTOMER,
    };
    if (is_public) {
      Object.assign(login_params, {
        domain: window.location.host,
        token: getSessionToken(),
      });
    }
    postApi<UserContextConfig>({
      url: 'auth/login',
      payload: login_params,
    }).then(async (res) => {
      setLoading(false);
      const {
        results: { data, error, errors, message },
      } = res;
      const { user, subscription } = data ?? {};
      if (errors) {
        setApiFieldErrors(errors);
        return;
      }
      if (error) {
        switch (error) {
          case 'error.invalid_credentials':
            setApiFieldErrors([
              {
                field: 'password',
                message: error,
              },
            ]);
            break;
          case 'error.email.unverified':
            toast(t('success.email_verification'), {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              pauseOnFocusLoss: false,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              bodyClassName: 'p-2',
              className: 'custom-theme',
            });
            break;
          case 'error.invalid_user_type':
            toast(t(error), {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              pauseOnFocusLoss: false,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              bodyClassName: 'p-2',
              className: 'custom-theme-toast',
            });
            break;
          case 'error.invalid_sign_in_page':
            const errorMsg = t(error);
            const errorSplit = errorMsg.split('THIS');
            setApiFieldErrors([
              {
                field: 'password',
                message: '',
                error: (
                  <>
                    {errorSplit[0]}
                    <a href={import.meta.env.VITE_ADMIN_HOST}>THIS</a>
                    {errorSplit[1]}
                  </>
                ),
              },
            ]);
            break;
          default:
            toast(t(error), {
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              pauseOnFocusLoss: false,
              progress: undefined,
              theme: 'dark',
              bodyClassName: 'p-2',
              className: 'custom-theme-toast',
            });
            break;
        }
      }
      if (res.headers['kasl-key'] && !error && data) {
        eraseImpersonator();
        setKaslKey(res.headers['kasl-key'].toString());
        clearMsgs();
        localStorage.removeItem('onboarding_page');
        eraseOnboardingToken();
        setMenuItems(
          is_public
            ? publicViewMenuItems
            : isSuperDuperAdmin(user)
              ? superDuperAdminItems
              : [
                  ...mainMenuItems,
                  ...settingsMenuItems,
                  ...bottomMenuItems,
                  designSystemItem,
                ]
        );
        if (user?.token) {
          setSessionToken(user.token);
        }
        setUser((prev) =>
          prev ? { ...prev, ...data } : { ...initialUser, ...data }
        );
        if (user?.onboarding_done === undefined || user.onboarding_done) {
          await handleGetUser();
          if (is_public) {
            navigate('/upvotes');
            return;
          }
          if (
            subscription &&
            subscription.status === 'canceled' &&
            subscription.trial_end
          ) {
            navigate('/billing');
            return;
          }
          navigate(
            isSuperDuperAdmin(user) ? '/super-duper-admin' : '/dashboard'
          );
          return;
        }
        localStorage.setItem('onboarding_page', user.onboarding_page ?? '');
        setOnboardingToken(res.headers['kasl-key'].toString());
        navigate(
          OnboardingUrls[
            localStorage.getItem('onboarding_page') as OnboardingPages
          ]
        );
        return;
      }
      if (message == 'success.login_email_confirmation') {
        toast(t('success.email_verification'), {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          pauseOnFocusLoss: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          bodyClassName: 'p-2',
          className: 'custom-theme',
        });
      }
    });
  };

  return (
    <div id="LoginForm">
      {showBanner === true && (
        <div className="custom-banner">
          {bannerText}
          <button onClick={() => setShowBanner(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>
      )}
      <Form id="login-form">
        {!is_public && (
          <img
            src="../../../static/images/logo.svg"
            alt="ProductHQ Logo"
            style={{ marginBottom: '24px' }}
          />
        )}
        <FormHeader>
          {!is_public ? (
            'Admin Sign in'
          ) : (
            <>
              Collaborator Sign in
              <p style={{ fontWeight: 700 }}>Start giving feedback</p>
            </>
          )}
        </FormHeader>
        <div className="form">
          <div className="sign-up-font mb-24">
            Don&apos;t have an account yet? <Link to={'/sign-up'}>Sign up</Link>
          </div>
          <fieldset>
            <UIField
              error_label={
                field_errors.find(
                  (field_error) => field_error.field === 'email'
                )?.message
              }
              id="EmailAddressField"
              is_error_state={field_errors.some(
                (field_error) =>
                  field_error.field === 'email' ||
                  (field_error.field === 'password' &&
                    field_error.message === 'error.invalid_credentials')
              )}
              label="Email Address"
              max_length={256}
              onBlur={(e) => {
                let email_address_error;
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
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              value={email}
              type="email"
              tab_index={1}
              onFocus={() => setShowBanner(false)}
              onChange={handleOnChangeEmail}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  onSubmit();
                }
              }}
            />
            <UIField
              error_label={field_errors
                .find((field_error) => field_error.field === 'password')
                ?.message.replace(
                  'error.password.weak',
                  'error.password.complexity'
                )
                .replace('error.password.invalid', 'error.password.complexity')
                .replace('error.password.length', 'error.password.complexity')}
              error={
                field_errors.find(
                  (field_error) => field_error.field === 'password'
                )?.error
              }
              is_error_state={field_errors.some(
                (field_error) => field_error.field === 'password'
              )}
              has_eye_icon={true}
              id="PasswordField"
              label="Password"
              max_length={256}
              onBlur={(e) => {
                let password_error;
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
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              value={password}
              type="password"
              tab_index={2}
              onFocus={() => setShowBanner(false)}
              onChange={handleOnChangePassword}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  onSubmit();
                }
              }}
            />
            <div className="has-text-right margin-26">
              <Link
                className="forgot-password has-text-weight-bold td-none"
                to={`/forgot-password`}
              >
                {t('forgot.password')}
              </Link>
            </div>
            <div className="field">
              <UIButton
                disabled={
                  loading ||
                  loading_social ||
                  field_errors.length > 0 ||
                  email.length === 0 ||
                  password.length === 0
                }
                onClick={onSubmit}
                show_arrow={loading ? false : true}
                tab_index={3}
                text={loading ? 'Loading ...' : 'Sign in'}
              />
            </div>
          </fieldset>
        </div>
        <label className="login-via">Or login via</label>
        <div className="social-container">
          {/* Google login */}
          <div
            className={`login-container${
              !loading && !loading_social ? ' is-clickable ' : ' is-disabled'
            }`}
            onClick={async () => {
              if (!loading && !loading_social) {
                setFirstName('');
                setLastName('');
                await loginGoogle();
              }
            }}
          >
            <div className="login-content google">
              <div className="icon-social">
                <svg
                  width="19"
                  height="13"
                  viewBox="0 0 19 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.57128 5.82832V7.79358H9.81957C9.6872 8.63536 8.83863 10.2646 6.57128 10.2646C4.61619 10.2646 3.0209 8.64554 3.0209 6.64972C3.0209 4.65391 4.61619 3.03485 6.57128 3.03485C7.68459 3.03485 8.42793 3.51005 8.85221 3.91736L10.4068 2.42049C9.40887 1.48707 8.11566 0.92363 6.57128 0.92363C3.40445 0.92363 0.845184 3.48289 0.845184 6.64972C0.845184 9.81656 3.40445 12.3758 6.57128 12.3758C9.73811 12.3758 12.07 10.0508 12.07 6.7787C12.07 6.40194 12.0292 6.11683 11.9783 5.82832H6.57128Z"
                    fill="#D95140"
                  />
                  <path
                    d="M18.8415 5.82825H17.2054V4.19222H15.5694V5.82825H13.9334V7.46428H15.5694V9.1003H17.2054V7.46428H18.8415V5.82825Z"
                    fill="#D95140"
                  />
                </svg>
              </div>
              <div className="label-social">
                <span>Log in with Google</span>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
          {/* Google login */}

          {!is_public && (
            <>
              {/* Facebook login */}
              {/* <FacebookLogin
                appId={appId}
                fields="name,email"
                callback={(response) => {
                  dispatch(setFirstName(response.name))
                  handleSocialLogin(response.email)
                }}
                onFailure={(err) => {
                  toast(err, {
                    position: 'bottom-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    className: 'custom-theme',
                  })
                }}
                isDisabled={loading || loading_social}
                render={(renderProps) => (
                  <div
                    className={`login-container${
                      !loading && !loading_social
                        ? ' is-clickable '
                        : ' is-disabled'
                    }`}
                    onClick={() => {
                      if (!loading && !loading_social) {
                        dispatch(setFirstName(''))
                        dispatch(setLastName(''))
                        renderProps.onClick()
                      }
                    }}
                  >
                    <div className="login-content facebook">
                      <div className="icon-social">
                        <svg
                          width="8"
                          height="16"
                          viewBox="0 0 8 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.97115 8.47402H4.78578V15.51H1.54338V8.47402H0V5.71798H1.54338V3.93466C1.54338 2.6604 2.14971 0.663086 4.81496 0.663086L7.21758 0.672813V3.34779H5.47641C5.19108 3.34779 4.78902 3.49046 4.78902 4.10003V5.72123H7.25973L6.97764 8.47402H6.97115Z"
                            fill="#366FDE"
                          />
                        </svg>
                      </div>
                      <div className="label-social">
                        <span>Log in with Facebook</span>
                        <ChevronRightIcon />
                      </div>
                    </div>
                  </div>
                )}
              /> */}
              {/* Facebook login */}
            </>
          )}

          {/* Github login */}
          <GitHubLogin
            loading={loading || loading_social}
            handleSocialLogin={handleSocialLogin}
          />
          {/* Github login */}
        </div>
      </Form>
      {verifying && <div id="VerifyPage">Verifying…</div>}
    </div>
  );
};
