import React, { createContext, useContext } from 'react';

interface DesignSystemContextProps {
  theme: {
    colors: {
      primary: {
        400: string;
        500: string;
      };
      neutral: {
        400: string;
      };
    };
    fontFamily: {
      sans: string[];
    };
    borderRadius: {
      DEFAULT: string;
    };
  };
}

const DesignSystemContext = createContext<DesignSystemContextProps | undefined>(undefined);

export const DesignSystemProvider = ({ children, value }: { children: React.ReactNode; value: DesignSystemContextProps }) => {
  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};