import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

export interface UIFieldProps {
  class_name?: string;
  container_class?: string;
  custom_message?: string;
  error_label?: string;
  error?: ReactNode;
  eye_icon?: string;
  has_eye_icon?: boolean;
  has_icon?: boolean;
  icon?: string;
  icon_svg?: React.ReactNode;
  icon_class?: string;
  id: string;
  input_class?: string;
  is_error_state?: boolean;
  is_success_state?: boolean;
  label?: string;
  label_class?: string;
  max_length?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeArea?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onFocusArea?: FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onKeyDownArea?: KeyboardEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  success_label?: string;
  tab_index?: number;
  type: 'text' | 'password' | 'number' | 'email' | 'textarea';
  value?: string;
}
