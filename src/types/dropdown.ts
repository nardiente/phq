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
  value:
    | 'Right'
    | 'Left'
    | 'Bolt'
    | 'Roadmap'
    | 'WhatsNew'
    | 'Idea'
    | 'Light'
    | 'Dark'
    | 'Modal'
    | 'Popover'
    | 'Sidebar'
    | 'Embed'
    | 'Count'
    | 'Dot'
    | 'None';
  label: string;
}

export interface SelectDropdownProps {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
  containerClass?: string;
  id?: string;
}
