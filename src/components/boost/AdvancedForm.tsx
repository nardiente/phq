import { useState } from 'react';
import { CreateBoostModal } from './CreateBoostModal';
import { useBoost } from '../../contexts/BoostContext';

interface AdvancedFormProps {
  config: any;
  onCreateBoost?: () => void;
  isCreated?: boolean;
}

export function AdvancedForm({
  config,
  onCreateBoost,
  isCreated = false,
}: AdvancedFormProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { addBoost } = useBoost();

  const handleCreateBoost = (name: string) => {
    addBoost(name, {
      ...config,
      type: config.type || 'Sidebar',
      position: config.position || 'Right',
      width: config.width || 450,
      height: config.height || 800,
      preventScroll: config.preventScroll ?? true,
      launcherType: config.launcherType || 'Tab',
      launcherPosition: config.launcherPosition || 'right',
      icon: config.icon || 'Bell',
      text: config.text || "What's new",
      backgroundColor: config.backgroundColor || '#5a00cd',
      badgeType: config.badgeType || 'Count',
      notificationCount: config.notificationCount || 3,
      appearance: {
        ...config.appearance,
        title: config.appearance?.title || 'Company Name',
        description:
          config.appearance?.description ||
          'Find out about the latest features, and product updates.',
        showCompanyLogo: config.appearance?.showCompanyLogo ?? true,
        theme: config.appearance?.theme || 'inherit',
        headerBackgroundColor:
          config.appearance?.headerBackgroundColor || '#f0eff2',
        headerTextColor: config.appearance?.headerTextColor || 'dark',
      },
    });
    setShowCreateModal(false);
    if (onCreateBoost) {
      onCreateBoost();
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className={`px-4 py-2 bg-[#FF5C35] text-white rounded-lg ${
            isCreated ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ff4a1a]'
          }`}
          disabled={isCreated}
        >
          Create Widget
        </button>
      </div>

      {showCreateModal && (
        <CreateBoostModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateBoost}
        />
      )}
    </div>
  );
}
