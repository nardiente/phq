import React from 'react';
import FaqBlock from './FaqBlock';

export default function Faqs() {
  return (
    <div className="faqs-section">
      <div className="dd-container">
        <div className="section-title">
          <h2 className="text-[48px] font-bold">Frequently asked questions</h2>
        </div>
        <div className="faqs-wrapper">
          <FaqBlock />
        </div>
      </div>
    </div>
  );
}
