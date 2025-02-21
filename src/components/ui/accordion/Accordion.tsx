 // src/components/Accordion.tsx
 import React from 'react';
 import AccordionBasic from './AccordionBasic';
 import AccordionBordered from './AccordionBordered';

 const Accordion = () => {
  return (
   <div>
    <h2>Basic Accordion</h2>
    <AccordionBasic />
    <h2>Bordered Accordion</h2>
    <AccordionBordered />
    <h2>Accordion 2</h2>
   </div>
  );
 };

 export default Accordion;