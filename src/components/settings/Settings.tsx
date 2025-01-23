import { ReactNode } from 'react';

export const Settings = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#fafafa]">
      <div className="flex flex-col gap-8 py-8 px-6">{children}</div>
    </div>
  );
};
