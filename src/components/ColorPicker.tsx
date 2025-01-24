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
      <label className="block text-[13px] font-medium m-0">{label}</label>
      <ColorPicketContainer
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <input
          className={`border-none w-7 h-7 bg-transparent rounded-full focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          type="color"
          onChange={onChange}
          value={value}
          disabled={readOnly}
        />
        <input
          className="focus:outline-none"
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
