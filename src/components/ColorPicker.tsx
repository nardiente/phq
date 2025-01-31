import { useTranslation } from 'react-i18next';
import { ColorPicketContainer } from './ColorPickerContainer';

interface ColorPickerProps {
  className?: string;
  label: string;
  value?: string;
  error?: boolean;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  readOnly?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  className = '',
  label,
  value = '',
  error = false,
  onBlur,
  onChange,
  onFocus,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-[13px] font-medium m-0" htmlFor={label}>
        {label}
      </label>
      <ColorPicketContainer
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <input
          id={label}
          className={`border-none w-6 h-6 bg-transparent rounded-full focus:outline-none opacity-0 absolute ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          type="color"
          onChange={onChange}
          value={value}
          disabled={readOnly}
        />
        <div className="relative w-6 h-6">
          <label htmlFor={label} className="cursor-pointer">
            <div
              className="w-6 h-6 rounded-full border border-[#e2e2ec]"
              style={{ backgroundColor: value }}
            ></div>
          </label>
        </div>
        <input
          className="focus:outline-none w-full"
          type="text"
          onChange={onChange}
          value={value}
          readOnly={readOnly}
        />
      </ColorPicketContainer>
      {error === true && (
        <label className="not-italic font-medium text-sm leading-[17px] tracking-[0.005em] text-red-400">
          {t('error.invalid_hex_value')}
        </label>
      )}
    </div>
  );
};

export default ColorPicker;
