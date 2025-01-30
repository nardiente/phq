export default function ImageTextBlock() {
  const imageTextData = [
    {
      image: '../static/images/Hassle-free-feedback-collection-image.png',
      title: 'Hassle-free feedback collection',
      description:
        'Let customers provide feedback with ease. Uncover and prioritise their biggest pain-points and best ideas using upvotes.',
    },
    {
      image: '../static/images/manage-your-data-efficiently-image.png',
      title: 'Manage your data efficiently',
      description:
        'Build a data-driven roadmap that keeps your team on track and your customers excited and informed abut upcoming features releases.',
    },
    {
      image: '../static/images/keep-your-team-in-the-loop-image.png',
      title: 'Keep your team in the loop',
      description:
        "Want to share your features and updates with the world? Announce them proudly with the What's New.",
    },
  ];

  const imageTextDataItems = imageTextData.map((block, idx) => (
    <div key={idx} className="image-text-block">
      <div className="image-block">
        <img src={block.image} alt="" />
      </div>
      <div className="text-block">
        <div className="block">
          <h2 className="text-[48px] font-bold">{block.title}</h2>
          <p>{block.description}</p>
        </div>
      </div>
    </div>
  ));

  return <>{imageTextDataItems}</>;
}
