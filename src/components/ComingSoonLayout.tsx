import React from 'react';

interface ComingSoonLayoutProps {
  children: React.ReactNode;
}

export function ComingSoonLayout({ children }: ComingSoonLayoutProps) {
  return (
    <div className="relative opacity-25 pointer-events-none select-none cursor-not-allowed">
      {children}
    </div>
  );
}
