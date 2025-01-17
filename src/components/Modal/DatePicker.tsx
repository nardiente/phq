import { Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePicker = ({ onChange }: DatePickerProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    onChange(formattedDate);
  };

  return (
    <div className="relative">
      <div className="flex items-center p-4 border rounded-lg">
        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="date"
          onChange={handleDateChange}
          className="outline-none flex-1 text-gray-700 focus:ring-1 focus:ring-purple-100"
        />
      </div>
    </div>
  );
};

export default DatePicker;
