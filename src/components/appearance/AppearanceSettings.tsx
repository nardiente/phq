interface AppearanceSettingsProps {
  title: string;
  showCompanyLogo: boolean;
  description: string;
  theme: string;
  headerBackgroundColor: string;
  headerTextColor: string;
}

export function AppearanceSettings({
  title,
  theme,
  headerBackgroundColor,
  headerTextColor,
}: AppearanceSettingsProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
      <span>{title}</span>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>{theme}</span>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>{headerBackgroundColor}</span>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>{headerTextColor}</span>
    </div>
  );
}
