export default function IconTextCol() {
  const iconTextBlockData = [
    {
      icon: '../static/images/upvotes-icon.svg',
      title: 'Upvotes',
      description:
        'Capture ideas from your customers and allow them to vote and comment on the ones they like best.',
    },
    {
      icon: '../static/images/roadmaps-icon.svg',
      title: 'Roadmaps',
      description:
        'Prioritise your products and features and keep everyone informed of progress and release dates.',
    },
    {
      icon: '../static/images/person-hearts.svg',
      title: 'What’s New',
      description:
        'Keep customers informed as you ship new features with What’s New.',
    },
  ];

  const iconTextBlockDataItems = iconTextBlockData.map((block, idx) => (
    <div key={idx} className="column-block">
      <div className="icon">
        <img src={block.icon} alt="" />
      </div>
      <div className="text-block">
        <h5>{block.title}</h5>
        <p>{block.description}</p>
      </div>
    </div>
  ));
  return <>{iconTextBlockDataItems}</>;
}
