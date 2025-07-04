export const Checkbox = ({
  checked,
  disabled = false,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <label className="flex gap-2 text-sm text-gray-900">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-[#5a00cd]"
      disabled={disabled}
    />
    {label}
  </label>
);
