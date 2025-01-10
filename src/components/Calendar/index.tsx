import { useState } from 'react';
import './styles.css';
import '../../react-datepicket.css';
import { Calendar4RangeIcon } from '../icons/calendar4-range.icon';
import { formatDate } from '../../utils/date';
import DatePicker from 'react-datepicker';

interface CalendarProps {
  label: string;
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}

export const Calendar = ({ label, value, setValue }: CalendarProps) => {
  const [date, setDate] = useState<Date>(value);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <div id="calendar">
      <label>{label}</label>
      <div className="control">
        <button
          id="dateValueField"
          className="date-trigger width-100 margin-top-10"
          onClick={() => setShowDatePicker((prev) => !prev)}
        >
          <div className="leading">
            <Calendar4RangeIcon />
          </div>
          {formatDate(value)}
        </button>
      </div>
      {showDatePicker && (
        <DatePicker
          className="example-datepicker"
          shouldCloseOnSelect={false}
          selected={date}
          onChange={(date) => setDate(date ?? new Date())}
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
