import { CheckIcon } from '../icons/check.icon';
import './styles.css';

interface Props {
  checked: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Checkbox = ({ checked, disabled, label, setChecked }: Props) => {
  return (
    <div id="checkbox">
      <div className="checkbox">
        <input
          className={disabled ? 'is-not-clickable disabled' : ''}
          checked={checked}
          onChange={() => (!disabled ? setChecked(!checked) : false)}
          type="checkbox"
          disabled={disabled}
        />
        <span
          className={disabled ? 'is-not-clickable disabled' : ''}
          onClick={() => (!disabled ? setChecked(!checked) : false)}
        >
          <CheckIcon />
        </span>
      </div>
      <label>{label}</label>
    </div>
  );
};
