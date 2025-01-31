import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { Switch } from '../ui/Switch';

interface WidgetSectionsFormProps {
  formState: WidgetConfig;
  onChange: (field: keyof WidgetConfig, value: any) => void;
}

type SectionKeys = 'ideas' | 'roadmap' | 'announcements';

export const WidgetSectionsForm: React.FC<WidgetSectionsFormProps> = ({
  formState,
  onChange,
}) => {
  const sections = [
    { id: 'ideas', label: 'Ideas' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'announcements', label: "What's New" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Show and hide Ideas, Roadmaps, and What's New.
      </p>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{section.label}</span>
            <Switch
              checked={formState.sections?.[section.id as SectionKeys] ?? true}
              onChange={(checked) =>
                onChange('sections', {
                  ...formState.sections,
                  [section.id]: checked,
                })
              }
              className={`${
                formState.sections?.[section.id as SectionKeys]
                  ? 'bg-[#5a00cd]'
                  : 'bg-gray-200'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
