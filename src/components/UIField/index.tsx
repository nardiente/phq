import './styles.css';
import * as React from 'react';
import { UIFieldProps } from './types';
import { useTranslation } from 'react-i18next';

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
        } ${props.class_name ? `${props.class_name}` : ''} relative`}
      >
        {props.type === 'textarea' ? (
          <textarea
            aria-describedby={props.id + 'Error'}
            aria-invalid={props.is_error_state}
            id={props.id}
            required={props.required}
            placeholder={props.placeholder}
            value={props.value}
            className={`${props.class_name} border rounded-md p-2 border-textarea`}
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
              className={`form-input${props.input_class ? `${props.input_class}` : ''}${props.is_error_state ? ' border-red-500' : ''}${props.is_success_state ? ' border-green-500' : ''} outline-none`}
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
              className={`absolute right-0 flex items-center${props.has_icon ? '' : ' hidden'}${props.has_eye_icon ? ' mr-6' : ''} ${props.icon_class}`}
            >
              {props.icon_svg ? (
                props.icon_svg
              ) : (
                <div className="w-4 h-4 my-3">
                  {props.icon ? (
                    <img src={props.icon} alt="" />
                  ) : (
                    <img src="../../../static/icons/green_check.svg" alt="" />
                  )}
                </div>
              )}
            </span>
            <span
              aria-checked={props.type !== 'password'}
              className={`w-10 h-10 absolute right-0 cursor-pointer${props.has_eye_icon ? '' : ' hidden'} ${props.icon_class}`}
              onClick={onViewPassword}
              role="switch"
            >
              <div className="w-4 h-4 m-3">
                {inpuType === 'password' ? (
                  <img
                    src={
                      props.eye_icon
                        ? props.eye_icon
                        : '../../../static/icons/eye-slash-fill.svg'
                    }
                    alt=""
                  />
                ) : (
                  <img
                    src={
                      props.eye_icon
                        ? props.eye_icon
                        : '../../../static/icons/eye-fill.svg'
                    }
                    alt=""
                  />
                )}
              </div>
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
