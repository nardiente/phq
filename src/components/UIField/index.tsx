import './styles.scss';
import * as React from 'react';
import styled from 'styled-components';
import { UIFieldProps } from './types';
import { useTranslation } from 'react-i18next';

const InputFieldIcon = styled.figure`
  margin: 13px auto;
`;

export const UIField: React.FC<UIFieldProps> = (props) => {
  const { t } = useTranslation();

  const [inpuType, setInpuType] = React.useState<string>(props.type);

  const onViewPassword = () => {
    if (inpuType === 'password') {
      setInpuType('text');
    } else {
      setInpuType('password');
    }
  };

  return (
    <div id="UIField" className={props.container_class}>
      <label className={props.label_class}>{props.label}</label>
      <div
        className={`control${
          props.has_icon || props.has_eye_icon ? ' has-icons-right' : ''
        }
          ${props.class_name ? ` ${props.class_name}` : ''}`}
      >
        {props.type === 'textarea' ? (
          <textarea
            aria-describedby={props.id + 'Error'}
            aria-invalid={props.is_error_state}
            id={props.id}
            required={props.required}
            placeholder={props.placeholder}
            value={props.value}
            className={['input textarea', props.class_name].join(' ').trim()}
            tabIndex={props.tab_index}
            aria-label={props.label}
            onChange={props.onChangeArea}
            onFocus={props.onFocusArea}
          />
        ) : (
          <>
            <input
              aria-describedby={`${props.id}${
                props.is_error_state ? 'Error' : ''
              }${props.is_success_state ? 'Success' : ''}`}
              aria-invalid={props.is_error_state}
              className={`input${
                props.input_class ? ` ${props.input_class}` : ''
              }${props.is_error_state ? ' error-state' : ''}${
                props.is_success_state ? ' success-state' : ''
              }`}
              id={props.id}
              maxLength={props.max_length}
              onBlur={props.onBlur}
              onChange={props.onChange}
              onFocus={props.onFocus}
              onKeyDown={props.onKeyDown}
              placeholder={props.placeholder}
              readOnly={props.readOnly}
              required={props.required}
              tabIndex={props.tab_index}
              type={inpuType}
              value={props.value}
            />
            <span
              className={`icon is-right${props.has_icon ? '' : ' is-hidden'}${
                props.has_eye_icon ? ' margin-right-25px' : ''
              }`}
            >
              {props.icon_svg ? (
                props.icon_svg
              ) : (
                <InputFieldIcon className="image is-16x16">
                  {props.icon ? (
                    <img src={props.icon} />
                  ) : (
                    <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/green_check.svg" />
                  )}
                </InputFieldIcon>
              )}
            </span>
            <span
              aria-checked={props.type !== 'password'}
              className={`icon is-right${
                props.has_eye_icon ? '' : ' is-hidden'
              }`}
              onClick={onViewPassword}
              role="switch"
            >
              <InputFieldIcon className="image is-16x16">
                {inpuType === 'password' ? (
                  <img
                    src={
                      props.eye_icon
                        ? props.eye_icon
                        : 'https://s3.amazonaws.com/uat-app.productfeedback.co/icon/eye-slash-fill.svg'
                    }
                  />
                ) : (
                  <img
                    src={
                      props.eye_icon
                        ? props.eye_icon
                        : 'https://s3.amazonaws.com/uat-app.productfeedback.co/icon/eye-fill.svg'
                    }
                  />
                )}
              </InputFieldIcon>
            </span>
          </>
        )}
      </div>
      {props.is_error_state &&
        props.error_label &&
        props.error_label.length > 0 && (
          <label
            id={props.id + 'Error'}
            className="msg-label label is-size-7 error"
          >
            {t(props.error_label)}
          </label>
        )}
      {props.error && (
        <label
          id={props.id + 'Error'}
          className="msg-label label is-size-7 error"
        >
          {props.error}
        </label>
      )}
      {props.is_success_state &&
        props.success_label &&
        props.success_label?.length > 0 && (
          <label
            id={props.id + 'Success'}
            className="msg-label label is-size-7 success"
          >
            {t(props.success_label)}
          </label>
        )}
      {props.custom_message && (
        <span className="custom-message">{props.custom_message}</span>
      )}
    </div>
  );
};
