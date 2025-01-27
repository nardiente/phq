import * as React from 'react';
import './styles.css';
import { FieldProps, TextareaProps } from './type';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const InputFieldIcon = styled.figure`
  margin: 13px auto;
`;

export const Field: React.FC<FieldProps> = (props) => {
  const { t } = useTranslation();
  const [inpuType, setinpuType] = React.useState<string>(props.type);

  const onViewPassword = () => {
    if (inpuType === 'password') {
      setinpuType('text');
    } else {
      setinpuType('password');
    }
  };

  return (
    <div className="field">
      {props.label && (
        <label
          className={`label is-size-7 ${props.label_class_name}`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <div className={`control ${props.has_icon ? 'has-icons-right' : ''}`}>
        <input
          aria-describedby={props.id + 'Error'}
          aria-invalid={props.has_error}
          id={props.id}
          required={props.is_required}
          placeholder={props.placeholder}
          value={props.value}
          className={`form-input bg-white outline-none text-gray-700 placeholder:opacity-[50%] ${props.class_name}`}
          tabIndex={props.tab_index}
          type={inpuType}
          aria-label={!props.label ? props.name : undefined}
          name={props.name}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          maxLength={props.max_length}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
        {props.icon === '' || props.icon === undefined ? (
          <span
            className={`icon is-right ${props.has_icon ? '' : 'is-hidden'}`}
            onClick={onViewPassword}
            role="switch"
            aria-checked={props.type !== 'password'}
          >
            <InputFieldIcon className="image is-24x24">
              {inpuType === 'password' ? (
                <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/eye-closed.svg" />
              ) : (
                <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/eye-open.svg" />
              )}
            </InputFieldIcon>
          </span>
        ) : (
          <span
            className={`icon is-right ${props.has_icon ? '' : 'is-hidden'}`}
            onClick={inpuType === 'password' ? onViewPassword : undefined}
            role="switch"
          >
            <InputFieldIcon className="image is-24x24">
              {inpuType === 'text' ? (
                <img src={props.icon} />
              ) : (
                <img
                  src={`https://s3.amazonaws.com/uat-app.productfeedback.co/icon/${props.icon}.svg`}
                />
              )}
            </InputFieldIcon>
          </span>
        )}
        {props.has_suffix ? (
          <label className={`input ${props.suffix_class_name}`}>
            {props.suffix_label}
          </label>
        ) : (
          ''
        )}
        {props.has_icon_outside ? (
          <span
            className={`icon is-right ${props.icon_class_name}`}
            onClick={props.onCopy}
          >
            <InputFieldIcon className="image is-24x24">
              <img src={props.icon} />
            </InputFieldIcon>
          </span>
        ) : (
          ''
        )}
        <p className="is-pulled-right">
          <button
            type="button"
            className={`button is-rounded ${
              !props.has_button ? 'is-hidden' : ''
            }`}
          >
            {props.button_label}
          </button>
        </p>
      </div>
      <label
        id={props.id + 'Error'}
        className={`label is-size-7 has-text-danger ${
          props.has_error ? '' : 'is-hidden'
        }`}
        style={{ marginTop: '8px' }}
      >
        {t(props.error_msg ?? '')}
      </label>
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="field" id="Textarea">
      {props.label && (
        <label className="label is-size-7" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div className={`control ${props.has_icon ? 'has-icons-right' : ''}`}>
        <textarea
          aria-describedby={props.id + 'Error'}
          aria-invalid={props.has_error}
          id={props.id}
          required={props.is_required}
          placeholder={props.placeholder}
          value={props.value}
          className={`form-input border rounded-md p-2 text-gray-700 ${props.class_name}`}
          tabIndex={props.tab_index}
          aria-label={props.label}
          name={props.name}
          onChange={props.onChange}
          rows={props.rows}
          onFocus={props.onFocus}
          readOnly={props.readonly}
        />
        <span
          className={`icon is-right ${props.icon_class} ${
            props.has_icon ? '' : 'is-hidden'
          }`}
          role="switch"
          aria-checked={props.type !== 'password'}
        >
          <InputFieldIcon className="image is-24x24">
            <img src={props.image} />
          </InputFieldIcon>
        </span>
      </div>
      <label
        id={props.id + 'Error'}
        className={`label is-size-7 has-text-danger ${
          props.has_error ? '' : 'is-hidden'
        }`}
      >
        {t(props.error_msg ?? '')}
      </label>
    </div>
  );
};

export default Field;
