import { useState } from 'react';
import './styles.css';
import { Calendar4RangeIcon } from '../icons/calendar4-range.icon';
import { formatDate, isValidDate } from '../../utils/date';
import DatePicker from 'react-datepicker';

interface CalendarProps {
  label: string;
  value?: Date;
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const Calendar = ({ label, value, setValue }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <div id="calendar">
      <label>{label}</label>
      <div className="control flex items-center w-full">
        <div className="leading flex items-center mt-2 text-[#6b7280]">
          <Calendar4RangeIcon className="absolute pl-4" />
        </div>
        <input
          id="dateValueField"
          className="date-trigger width-100 margin-top-10 outline-none"
          onBlur={() => setValue(date)}
          onChange={(e) => {
            if (isValidDate(e.target.value)) {
              setDate(new Date(e.target.value));
            }
          }}
          onClick={() => setShowDatePicker(true)}
          onFocus={() => setShowDatePicker(true)}
          onKeyDown={(e) => {
            if (e.code === 'Backspace') {
              setDate(undefined);
              setShowDatePicker((prev) => !prev);
            }
            if (e.code.includes('Enter')) {
              setShowDatePicker((prev) => !prev);
            }
          }}
          value={date ? formatDate(date) : 'no date'}
        />
      </div>
      {showDatePicker && (
        <DatePicker
          className="example-datepicker"
          shouldCloseOnSelect={false}
          selected={date}
          onBlur={() => setValue(date)}
          onChange={(date) => setDate(date ?? undefined)}
          onClickOutside={() => {
            setValue(date);
            setShowDatePicker(false);
          }}
          onSelect={(date) => setDate(date)}
          inline
          timeInputLabel=""
          showTimeInput
        >
          <button
            className="datepicker-schedule-btn is-clickable"
            onClick={() => {
              setValue(date);
              setShowDatePicker(false);
            }}
          >
            Schedule
          </button>
          <button
            className="datepicker-cancel-btn is-clickable"
            onClick={() => setShowDatePicker(false)}
          >
            Cancel
          </button>
        </DatePicker>
      )}
    </div>
  );
};
