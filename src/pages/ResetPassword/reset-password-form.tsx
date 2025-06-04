import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiFieldError } from '../../utils/api/types';
import { putApi } from '../../utils/api/api';
import queryString from 'query-string';
import { UIField } from '../../components/UIField';
import { validatePassword } from '../../utils/custom-validation';
import { UIButton } from '../../components/UIButton';
import { clearQueryString } from '../../utils/uri';

const ArrowLeftIcon = styled.img`
  vertical-align: middle;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 63%;
`;

const FormHeader = styled.div`
  font-family: 'Satoshi-Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: #000000;
  margin-bottom: 8px;
`;

export const ResetPasswordForm: FC<{
  is_mobile?: boolean;
}> = (props) => {
  const { t } = useTranslation();
  const [new_password, setNewPassword] = useState('');
  const [confirm_new_password, setConfirmNewPassword] = useState('');
  const [api_field_success, setApiFieldSuccess] = useState<string>('');
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [id, setId] = useState<number>(0);
  const [reset_key, setResetKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [password_match, setPasswordMatch] = useState<boolean>(false);

  const onSubmit = () => {
    setLoading(true);
    putApi('auth/reset-password', {
      id,
      reset_key,
      password: new_password,
      confirm_password: confirm_new_password,
    }).then((res) => {
      setLoading(false);

      if (res.results.errors) {
        setApiFieldSuccess('');
        setApiFieldErrors(res.results.errors);
        return;
      }

      if (res.results.error) {
        setApiFieldSuccess('');
        toast(t(res.results.error || ''), {
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

      if (res.results.data) {
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordMatch(false);
        setApiFieldErrors([]);
        setApiFieldSuccess(res.results.message || '');
        toast(t(res.results.message || ''), {
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
    });
  };

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);
      if (typeof params['u'] === 'string' && typeof params['k'] === 'string') {
        setId(parseInt(params['u'] ?? 0));
        setResetKey(params['k']);
      }

      clearQueryString();
    }
  }, []);

  useEffect(() => {
    const form = document.getElementById(
      'reset-password-form'
    ) as HTMLFormElement;
    if (form) {
      form.style.paddingLeft = props.is_mobile ? '25px' : '0';
      form.style.paddingRight = props.is_mobile ? '25px' : '0';
      form.style.width = props.is_mobile ? '100%' : '63%';
    }
  }, [props.is_mobile]);

  return (
    <div id="ResetPasswordForm">
      <Form id="reset-password-form">
        <FormHeader>Reset password</FormHeader>
        <div className="description">
          Reminder: Passwords must be longer than 8 characters, must contain one
          uppercase, one lowercase, one number, and one symbol.
        </div>
        <form onSubmit={onSubmit}>
          <fieldset>
            <UIField
              container_class="margin-bottom-0"
              error_label={api_field_errors
                .find((field_error) => field_error.field === 'password')
                ?.message?.replace(
                  'error.password.weak',
                  'error.password.complexity'
                )
                .replace('error.password.invalid', 'error.password.complexity')
                .replace('error.password.length', 'error.password.complexity')}
              has_eye_icon={true}
              has_icon={password_match}
              id="PasswordField"
              is_error_state={api_field_errors.some(
                (field_error) => field_error.field === 'password'
              )}
              is_success_state={password_match}
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
                  let copy_api_field_errors = api_field_errors.filter(
                    (field_error) => field_error.field !== 'password'
                  );
                  if (copy_api_field_errors.length > 0)
                    copy_api_field_errors.push(password_error);
                  else copy_api_field_errors = [password_error];
                  setApiFieldErrors(copy_api_field_errors);
                }
              }}
              onChange={(e) => {
                setApiFieldErrors(
                  api_field_errors.filter(
                    (field_error) =>
                      field_error.field !== 'password' &&
                      field_error.field !== 'confirm_password'
                  )
                );
                setPasswordMatch(false);
                setNewPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = document.getElementById(
                    'ConfirmPasswordField'
                  ) as HTMLInputElement;
                  if (input) {
                    input.focus();
                  }
                }
              }}
              placeholder="New password"
              required={true}
              tab_index={5}
              type="password"
              value={new_password}
            />
            <UIField
              error_label={api_field_errors
                .find((field_error) => field_error.field === 'confirm_password')
                ?.message?.replace(
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
              is_error_state={api_field_errors.some(
                (field_error) => field_error.field === 'confirm_password'
              )}
              is_success_state={password_match}
              max_length={256}
              onBlur={(e) => {
                let confirm_password_error;
                if (
                  new_password !== confirm_new_password &&
                  e.target.value.length > 0
                ) {
                  confirm_password_error = {
                    field: 'confirm_password',
                    message: 'The passwords do not match. Please try again.',
                  };
                }
                if (
                  !api_field_errors.some(
                    (field_error) => field_error.field === 'password'
                  ) &&
                  e.target.value.length > 0 &&
                  new_password === e.target.value
                ) {
                  setPasswordMatch(true);
                }
                if (confirm_password_error) {
                  let copy_field_errors = api_field_errors.filter(
                    (field_error) => field_error.field !== 'confirm_password'
                  );
                  if (copy_field_errors.length > 0)
                    copy_field_errors.push(confirm_password_error);
                  else copy_field_errors = [confirm_password_error];
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              onChange={(e) => {
                setApiFieldErrors(
                  api_field_errors.filter(
                    (field_error) => field_error.field !== 'confirm_password'
                  )
                );
                setPasswordMatch(false);
                setConfirmNewPassword(e.target.value);
                if (
                  !api_field_errors.some(
                    (field_error) => field_error.field === 'password'
                  ) &&
                  e.target.value.length > 0 &&
                  new_password === e.target.value
                ) {
                  setPasswordMatch(true);
                }
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !(
                    loading ||
                    api_field_errors.length > 0 ||
                    new_password.length === 0 ||
                    confirm_new_password.length === 0 ||
                    !password_match
                  )
                ) {
                  onSubmit();
                }
              }}
              placeholder="Confirm new password"
              required={true}
              success_label="Matched!"
              tab_index={6}
              type="password"
              value={confirm_new_password}
            />
            <div className={`field ${api_field_success ? 'is-hidden' : ''}`}>
              <UIButton
                disabled={
                  loading ||
                  api_field_errors.length > 0 ||
                  new_password.length === 0 ||
                  confirm_new_password.length === 0 ||
                  !password_match
                }
                onClick={onSubmit}
                show_arrow={loading ? false : true}
                tab_index={2}
                text={loading ? 'Loading ...' : 'Reset password'}
              />
            </div>
          </fieldset>
        </form>
        <div className="has-text-centered flex justify-center">
          <Link
            className="back-signin has-text-weight-bold flex items-center"
            to={'/sign-in'}
          >
            <ArrowLeftIcon src="./static/icons/arrow-left.svg" />
            &nbsp;&nbsp; Back to sign in
          </Link>
        </div>
      </Form>
    </div>
  );
};
