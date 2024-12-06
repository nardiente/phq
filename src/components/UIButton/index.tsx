import './styles.scss';
import * as React from 'react';
import { UIButtonProps } from './types';

export const UIButton: React.FC<UIButtonProps> = (props) => {
  return (
    <button
      className={`${props.disabled ? 'is-not-clickable' : 'is-clickable'}`}
      disabled={props.disabled}
      id="UIButton"
      onClick={props.onClick}
      tabIndex={props.tab_index}
      type="button"
    >
      {props.text}
      <img
        className={`${!props.show_arrow ? 'is-hidden' : ''}`}
        src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/arrow-right.svg"
      />
    </button>
  );
};
