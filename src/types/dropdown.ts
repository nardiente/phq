export interface Option {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_photo?: string;
  value: string;
  type: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
  containerClass?: string;
  id?: string;
}
