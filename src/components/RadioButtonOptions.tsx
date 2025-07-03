import { RadioFillIcon } from './icons/radio-fill.icon';
import { RadioIcon } from './icons/radio.icon';

interface Option {
  label: string;
  value: string;
}

export const RadioButtonOptions = ({
  direction = 'row',
  options,
  selected,
  select,
}: {
  direction?: 'column' | 'row';
  options: Option[];
  selected?: Option;
  select: (selected: Option) => void;
}) => {
  return (
    <div className={`flex ${direction === 'column' ? 'flex-col' : ''} gap-15`}>
      {options?.map((option, idx) => (
        <div
          key={idx}
          className="flex items-center gap-[16px] text-cetacean-blue-400 text-button-sm"
        >
          <a className="flex" onClick={() => select(option)}>
            {selected?.value === option.value ? (
              <RadioFillIcon />
            ) : (
              <RadioIcon />
            )}
          </a>
          {option.label}
        </div>
      ))}
    </div>
  );
};
