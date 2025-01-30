import React from 'react';
import ToolsInfoBlock from './ToolsInfoBlock';

export default function OurTools() {
  return (
    <div className="our-tools-section">
      <div className="dd-container">
        <div className="section-title">
          <h2 className="text-[48px] font-bold">
            One place to collect feedback <br />
            and announce product updates
          </h2>
          <p>
            With ProductHQ you can collect, organise and prioritise feature
            requests to better understand customer feedback and use them to
            inform your product decisions.
          </p>
        </div>
        <div className="tools-wrapper">
          <ToolsInfoBlock />
        </div>
      </div>
    </div>
  );
}
