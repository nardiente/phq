import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

export interface FieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  name: string;
  type: 'text' | 'password' | 'number' | 'email';
  tab_index?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onCopy?: MouseEventHandler<HTMLSpanElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  has_error?: boolean;
  error_msg?: string;
  has_icon?: boolean;
  icon?: string;
  icon_class_name?: string;
  is_required?: boolean;
  class_name?: string;
  label_class_name?: string;
  max_length?: number;
  has_suffix?: boolean;
  suffix_label?: string;
  suffix_class_name?: string;
  has_icon_outside?: boolean;
  has_button?: boolean;
  button_label?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface TextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  name: string;
  type: 'text' | 'password' | 'number' | 'email';
  tab_index?: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  has_error?: boolean;
  error_msg?: string;
  has_icon?: boolean;
  icon_class?: string;
  is_required?: boolean;
  class_name?: string;
  rows?: number;
  image?: string;
  readonly?: boolean;
}
