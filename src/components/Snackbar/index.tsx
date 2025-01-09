import * as React from 'react';
import { ApiFieldError } from './types';
import './styles.css';
import { useTranslation } from 'react-i18next';

// Error snack bar
export const ErrorSnackBar: React.FC<{
  cssClass?: string;
  error?: string;
  errors?: ApiFieldError[];
}> = (propTypes) => {
  const { t } = useTranslation();

  return (
    <div
      id="ErrorSnackBar"
      className={`${
        (propTypes.errors && propTypes.errors.length > 0) || propTypes.error
          ? ''
          : 'is-hidden'
      }`}
      role="alert"
      aria-label="Error Snack Bar"
    >
      <div
        className={`snack-wrap ${
          (propTypes.errors && propTypes.errors.length > 0) || propTypes.error
            ? 'show'
            : 'hide'
        } has-text-centered has-margin-bottom-30`}
      >
        <div
          className={`snackbar animated notification is-danger ${
            propTypes.cssClass || ''
          }`}
        >
          <ul>
            {propTypes.error && <li>{t(propTypes.error)}</li>}
            {propTypes.errors &&
              propTypes.errors.map((error, index) => (
                <li key={index}>{t(error.message ?? '')}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Success snack bar
export const SuccessSnackBar: React.FC<{
  cssClass?: string;
  success: string;
}> = (propTypes) => {
  const { t } = useTranslation();

  return (
    <div
      id="SuccessSnackBar"
      className={`${propTypes.success ? '' : 'is-hidden'}`}
      role="alert"
      aria-label="Success Snack Bar"
    >
      <div
        className={`snack-wrap ${
          propTypes.success ? 'show' : 'hide'
        } has-text-centered has-margin-bottom-30`}
      >
        <div
          className={`snackbar animated notification is-success ${
            propTypes.cssClass || ''
          }`}
        >
          {t(propTypes.success)}
        </div>
      </div>
    </div>
  );
};
