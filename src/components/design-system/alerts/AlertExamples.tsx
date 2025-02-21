import React from 'react';
import Alert from './Alert';
import { Info } from 'lucide-react';

export const AlertExamples = () => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex gap-9 items-start">
        <ExampleWrapper label="Description">
          <Alert 
            variant="example-warning"
            title="Warning Title"
            description="We are unable to save any progress at this time."
          />
        </ExampleWrapper>
        {/* Other examples */}
      </div>
    </div>
  );
};

const ExampleWrapper: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="flex flex-col gap-[15px] items-start relative">
    <div className="relative w-full h-[17px] bg-transparent">
      <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
        <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
          {label}
        </span>
      </p>
    </div>
    {children}
  </div>
); 