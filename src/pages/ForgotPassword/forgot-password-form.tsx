import React from 'react';
import './styles.css';
import { postApi } from '../../utils/api/api';
import { ApiFieldError } from '../../utils/api/types';
import styled from 'styled-components';
import { ForgotPasswordFormProps } from '../../types/user';
import { Link } from 'react-router-dom';
import { UIButton } from '../../components/UIButton';
import { UIField } from '../../components/UIField';
import { validateEmail } from '../../utils/custom-validation';

const ArrowLeftIcon = styled.img`
  vertical-align: middle;
  margin-bottom: 0.25em;
  display: inline-block;
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

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (
  props
) => {
  const [email, setEmail] = React.useState('');
  const [api_field_success, setApiFieldSuccess] = React.useState<string>('');
  const [field_errors, setApiFieldErrors] = React.useState<ApiFieldError[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const clearMsgs = () => {
    setApiFieldErrors([]);
    setApiFieldSuccess('');
  };

  const handleOnChangeEmail = (e: any) => {
    setEmail(e.target.value);
    clearMsgs();
  };

  const onSubmit = async () => {
    setLoading(true);
    await postApi({
      url: 'auth/forgot-password',
      payload: {
        email: email,
        type: props.type || '',
      },
    }).then((res) => {
      clearMsgs();
      if (res.results.error) {
        setApiFieldErrors([
          {
            field: 'email',
            message: res.results.error,
          },
        ]);
      }
      if (res.results.error && res.results.errors) {
        setApiFieldSuccess('');
        setApiFieldErrors(res.results.errors);
      }

      if (res.results.data) {
        setApiFieldSuccess(res.results.message || '');
      }
      setLoading(false);
    });
  };

  React.useEffect(() => {
    const sign_up_form = document.getElementById(
      'forgot-password-form'
    ) as HTMLFormElement;
    if (sign_up_form) {
      sign_up_form.style.paddingLeft = props.is_mobile ? '25px' : '0';
      sign_up_form.style.paddingRight = props.is_mobile ? '25px' : '0';
      sign_up_form.style.width = props.is_mobile ? '100%' : '63%';
    }
  }, [props.is_mobile]);

  return (
    <div id="ForgotPasswordForm">
      <Form id="forgot-password-form">
        <FormHeader>Forgot password</FormHeader>
        <div className="description">
          Enter the email address or username associated with your account. A
          reset instruction will be provided in the email to reset your password
        </div>
        <form className="form" onSubmit={onSubmit}>
          <fieldset>
            <UIField
              error_label={
                field_errors.find(
                  (field_error) => field_error.field === 'email'
                )?.message
              }
              is_error_state={field_errors.some(
                (field_error) => field_error.field === 'email'
              )}
              id="EmailAddressField"
              value={email}
              label="Email Address"
              max_length={256}
              onBlur={(e) => {
                let email_address_error;
                if (e.target.value.length === 0) {
                  email_address_error = {
                    field: 'email',
                    message: 'error.email.required',
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
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              type="email"
              tab_index={1}
              onChange={handleOnChangeEmail}
              has_icon={false}
              is_success_state={api_field_success.length > 0}
              success_label={api_field_success}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
            <div className={`field ${api_field_success ? 'is-hidden' : ''}`}>
              <UIButton
                disabled={
                  loading || field_errors.length > 0 || email.length === 0
                }
                onClick={onSubmit}
                show_arrow={loading ? false : true}
                tab_index={2}
                text={loading ? 'Loading ...' : 'Submit'}
              />
            </div>
          </fieldset>
        </form>
        <div className="has-text-centered">
          <Link className="back-signin has-text-weight-bold" to={'/sign-in'}>
            <ArrowLeftIcon src="../../../static/icons/arrow-left.svg" />
            &nbsp;&nbsp; Back to sign in
          </Link>
        </div>
      </Form>
    </div>
  );
};
