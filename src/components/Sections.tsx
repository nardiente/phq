import React, { useState, useEffect } from 'react';
import Section from './Section';
import { BoostTypeForm } from './boost/BoostTypeForm';
import { LauncherTypeForm } from './boost/LauncherTypeForm';
import { AppearanceForm } from './boost/AppearanceForm';
import { CreateBoostModal } from './boost/CreateBoostModal';
import { useBoost } from '../contexts/BoostContext';
import { defaultConfig } from '../contexts/BoostContext';

interface SectionsProps {
  initialConfig?: typeof defaultConfig;
  onCreateBoost?: () => void;
}

export default function Sections({
  initialConfig,
  onCreateBoost,
}: SectionsProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const { updateCurrentBoostConfig, addBoost } = useBoost();
  const [config, setConfig] = useState(initialConfig || defaultConfig);
  const [isCreated, setIsCreated] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  const handleConfigUpdate = (updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    updateCurrentBoostConfig(newConfig);
  };

  const handleCreateWidget = () => {
    setShowCreateModal(true);
  };

  const handleSaveWidget = (name: string) => {
    addBoost(name, config);
    setIsCreated(true);
    setShowCreateModal(false);
    if (onCreateBoost) {
      onCreateBoost();
    }
  };

  const toggleSection = (sectionNumber: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionNumber)
        ? prev.filter((num) => num !== sectionNumber)
        : [sectionNumber]
    );
  };

  return (
    <div className="px-6 space-y-3">
      <Section
        number={1}
        title="Widget Type"
        subtitle={`${config.type} • ${config.position || ''} • Width:${config.width}px • Height:${config.height}px`}
        isExpanded={expandedSections.includes(1)}
        onToggle={() => toggleSection(1)}
        details={<BoostTypeForm config={config} onSave={handleConfigUpdate} />}
        hasInternalButtons={false}
      />
      <Section
        number={2}
        title="Launcher Type"
        subtitle={`${config.launcherType} • ${config.launcherPosition} • ${config.icon} • ${config.badgeType} • ${config.backgroundColor}`}
        isExpanded={expandedSections.includes(2)}
        onToggle={() => toggleSection(2)}
        details={
          <LauncherTypeForm config={config} onSave={handleConfigUpdate} />
        }
        hasInternalButtons={false}
      />
      <Section
        number={3}
        title="Appearance"
        subtitle={`${config.appearance.theme} • ${config.appearance.headerBackgroundColor} • ${config.appearance.headerTextColor}`}
        isExpanded={expandedSections.includes(3)}
        onToggle={() => toggleSection(3)}
        details={
          <>
            <AppearanceForm config={config} onSave={handleConfigUpdate} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreateWidget}
                className={`px-4 py-2 bg-[#FF5C35] text-white rounded-lg ${
                  isCreated
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#ff4a1a]'
                }`}
                disabled={isCreated}
              >
                Create Widget
              </button>
            </div>
          </>
        }
        hasInternalButtons={false}
      />

      {showCreateModal && (
        <CreateBoostModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveWidget}
        />
      )}
    </div>
  );
}
