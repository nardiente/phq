export const Checkbox = ({ checked, onChange, label }: { 
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <label className="flex gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="accent-[#5a00cd]"
    />
    {label}
  </label>
); 