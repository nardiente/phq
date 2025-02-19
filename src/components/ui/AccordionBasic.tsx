 // src/components/ui/AccordionBasic.tsx
 import React from 'react';
 import { useDesignSystem } from '../../DesignSystemContext';

 const AccordionBasic = () => {
  const { theme } = useDesignSystem();

  return (
   <div className="rounded-md p-4">
    <h2 className="text-lg font-semibold" style={{ color: theme.colors.neutral.text }}>Accordion Title</h2>
    <div>Accordion Content</div>
   </div>
  );
 };

 export default AccordionBasic;