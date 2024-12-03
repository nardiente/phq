import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BoostConfig {
  type: string;
  position?: string;
  width: number;
  height: number;
  offset?: number;
  preventScroll?: boolean;
  launcherType: string;
  launcherPosition: string;
  icon: string;
  text?: string;
  backgroundColor: string;
  badgeType: string;
  notificationCount: number;
  appearance: {
    title: string;
    description: string;
    showCompanyLogo: boolean;
    theme: string;
    headerBackgroundColor: string;
    headerTextColor: string;
  };
}

interface Boost {
  id: string;
  name: string;
  sections: string;
  lastUpdated: string;
  config: BoostConfig;
}

interface BoostContextType {
  boosts: Boost[];
  currentBoost: Boost | null;
  addBoost: (name: string, config: BoostConfig) => Boost;
  updateBoost: (id: string, updates: Partial<Boost>) => void;
  deleteBoost: (id: string) => void;
  setCurrentBoost: (boost: Boost | null) => void;
  updateCurrentBoostConfig: (config: Partial<BoostConfig>) => void;
}

export const defaultConfig: BoostConfig = {
  type: 'Sidebar',
  position: 'Right',
  width: 450,
  height: 800,
  offset: 20,
  preventScroll: true,
  launcherType: 'Tab',
  launcherPosition: 'right',
  icon: 'Bell',
  text: "What's new",
  backgroundColor: '#5a00cd',
  badgeType: 'Count',
  notificationCount: 3,
  appearance: {
    title: 'Company Name',
    description: 'Find out about the latest features, and product updates.',
    showCompanyLogo: true,
    theme: 'inherit',
    headerBackgroundColor: '#f0eff2',
    headerTextColor: 'dark'
  }
};

const BoostContext = createContext<BoostContextType | undefined>(undefined);

const STORAGE_KEY = 'boosts_data';

export function BoostProvider({ children }: { children: ReactNode }) {
  const [boosts, setBoosts] = useState<Boost[]>(() => {
    const savedBoosts = localStorage.getItem(STORAGE_KEY);
    return savedBoosts ? JSON.parse(savedBoosts) : [];
  });
  
  const [currentBoost, setCurrentBoost] = useState<Boost | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boosts));
  }, [boosts]);

  const addBoost = (name: string, config: BoostConfig) => {
    const newBoost: Boost = {
      id: Date.now().toString(),
      name,
      sections: 'Announcements',
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      config: { ...config }
    };
    
    setBoosts(prev => [...prev, newBoost]);
    return newBoost;
  };

  const updateBoost = (id: string, updates: Partial<Boost>) => {
    setBoosts(prev => prev.map(boost => 
      boost.id === id 
        ? { 
            ...boost, 
            ...updates,
            lastUpdated: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          }
        : boost
    ));
  };

  const updateCurrentBoostConfig = (config: Partial<BoostConfig>) => {
    if (currentBoost) {
      const updatedBoost = {
        ...currentBoost,
        config: {
          ...currentBoost.config,
          ...config
        },
        lastUpdated: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      setCurrentBoost(updatedBoost);
      updateBoost(currentBoost.id, updatedBoost);
    }
  };

  const deleteBoost = (id: string) => {
    setBoosts(prev => prev.filter(boost => boost.id !== id));
    if (currentBoost?.id === id) {
      setCurrentBoost(null);
    }
  };

  return (
    <BoostContext.Provider value={{
      boosts,
      currentBoost,
      addBoost,
      updateBoost,
      deleteBoost,
      setCurrentBoost,
      updateCurrentBoostConfig
    }}>
      {children}
    </BoostContext.Provider>
  );
}

export function useBoost() {
  const context = useContext(BoostContext);
  if (context === undefined) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  return context;
}