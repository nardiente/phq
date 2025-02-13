interface FormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, description, children }: FormFieldProps) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
    {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
    {children}
  </div>
); 