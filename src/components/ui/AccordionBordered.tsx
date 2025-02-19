 // src/components/ui/AccordionBordered.tsx
 import React from 'react';
 import { useDesignSystem } from '../../DesignSystemContext';

 const AccordionBordered = () => {
  const { theme } = useDesignSystem();

  return (
   <div className="border border-gray-200 rounded-md p-4">
    <h2 className="text-lg font-semibold" style={{ color: theme.colors.neutral.text }}>Accordion Title</h2>
    <div>Accordion Content</div>
   </div>
  );
 };

 export default AccordionBordered;