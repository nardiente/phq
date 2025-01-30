import React from 'react';

export default function ToolsInfoBlock() {
  const ourToolsData = [
    {
      title: '60 day money back guarantee',
      description:
        "If you're not completely satisfied with ProductHQ, we have a 60 day money back guarantee, super simple.",
    },
    {
      title: 'Human-centered design',
      description:
        'We focused on beautiful, elegant, simple design so you have a great experience every time you and your customers use ProductHQ.',
    },
    {
      title: 'Upvote feature',
      description:
        'Customer feedback is critical for product success. Discover the most in demand products that your customers want.',
    },
    {
      title: 'Roadmap features',
      description:
        'Easily prioritise feature requests to streamline your product roadmap and meet customer expectations efficiently.',
    },
    {
      title: 'What’s New feature',
      description:
        'The What’s New feature makes it easy to keep your customers up-to-date about new features, improvements, bug fixes and more.',
    },
    {
      title: 'Admin portal',
      description:
        'One place that allows you to simply and easily manage your settings, admins, users, upvotes, roadmap, and what’s new.',
    },
    {
      title: 'Private comments',
      description:
        'Sometimes you need to share internal comments with your team or make a note. Private comments lets you do just that.',
    },
    {
      title: 'Pinned posts and comments',
      description:
        'If you ever wanted to make a post or comment stand out so you can collect more input about a topic, now you can.',
    },
    {
      title: 'Custom domain + SSL',
      description:
        'Create a custom domain to match your brand and make sure it’s secure with an SSL.',
    },
    {
      title: 'Customised branding',
      description:
        'ProductHQ allows you to customise your public board to match your brand perfectly for a seamless user experience.',
    },
    {
      title: 'Whitelabel',
      description:
        'You can remove the "Powered by ProductHQ" branding from your feedback portal. Your site. Your choice, right?',
    },
    {
      title: '... and much much more',
      description:
        'There are too many features to mention in this one section and we’re adding more all the time.',
    },
  ];

  const ourToolsDataItems = ourToolsData.map((block, idx) => (
    <div key={idx} className="tools-info-block">
      <div className="info-block">
        <img src="../static/images/checkmark-icon.svg" alt="" />
        <h5>{block.title}</h5>
        <p>{block.description}</p>
      </div>
    </div>
  ));

  return <>{ourToolsDataItems}</>;
}
