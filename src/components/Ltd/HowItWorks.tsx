import React from 'react';

export default function HowItWorks() {
  const howItWorksData = [
    {
      icon: '../static/images/click.svg',
      title: 'Purchase a lifetime plan',
      description: 'Chose from the plans to get a lifetime discount.',
    },
    {
      icon: '../static/images/chats.svg',
      title: 'Collect customer feedback',
      description: 'Add a URL to your website and start collecting feedback.',
    },
    {
      icon: '../static/images/stars.svg',
      title: 'Build valuable products',
      description:
        'Release features and updates that drive revenue, growth, and customer retention.',
    },
  ];

  const howItWorksDataItems = howItWorksData.map((block, idx) => (
    <div key={idx} className="how-it-work-item">
      <div className="how-it-work-block">
        <div className="icon-block">
          <img src={block.icon} alt="" />
        </div>
        <div className="text-block">
          <h3>{block.title}</h3>
          <p>{block.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="how-it-works-section">
      <div className="dd-container">
        <div className="section-title">
          <h6 className="font-bold">HOW IT WORKS</h6>
          <h2 className="text-[48px] font-bold">
            Start making better product decisions in 3 simple steps.
          </h2>
        </div>
        <div className="how-it-works-wrapper">{howItWorksDataItems}</div>
      </div>
    </div>
  );
}
