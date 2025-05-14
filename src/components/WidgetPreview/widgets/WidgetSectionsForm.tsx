import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { Toggle } from '../ui/Toggle';
import { UI_TEXT } from '../../constants/uiText';

interface WidgetSectionsFormProps {
  formState: WidgetConfig;
  onChange: (updates: { sections: WidgetConfig['sections'] }) => void;
}

type SectionKeys = 'ideas' | 'roadmap' | 'announcements';

export const WidgetSectionsForm = ({
  formState = { sections: {} },
  onChange,
}: WidgetSectionsFormProps) => {
  const sections = [
    { id: 'ideas', label: UI_TEXT.WIDGET_SECTIONS.IDEAS },
    { id: 'roadmap', label: UI_TEXT.WIDGET_SECTIONS.ROADMAP },
    { id: 'announcements', label: UI_TEXT.WIDGET_SECTIONS.WHATS_NEW },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-900">
          Choose which sections to show in your Widget
        </h3>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{section.label}</span>
            <Toggle
              checked={!!formState.sections?.[section.id]}
              onChange={(checked) => {
                onChange({
                  sections: {
                    ...formState.sections,
                    [section.id]: checked,
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
