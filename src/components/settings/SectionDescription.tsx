import React, { ReactNode } from 'react';

interface SectionDescriptionProps {
  text: ReactNode;
  className?: string;
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  text,
  className,
}) => {
  return <p className={`text-[13px] text-gray-600 ${className}`}>{text}</p>;
};

export default SectionDescription;
