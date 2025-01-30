import Slider from 'react-slick';

export default function TestimonialBlock() {
  const testimonialsData = [
    {
      authorName: 'Aura Brooks',
      authorPosition: 'Graphic Designer',
      testimonialMessage:
        "I've tested out all the other products on the market, but ProductHQ takes the cake when it comes to user interface and experience. The team behind it is constantly rolling out new features at an incredible pace, which is really impressive.",
    },
    {
      authorName: 'Eve Crawford',
      authorPosition: 'Product Designer',
      testimonialMessage:
        'I experimented with a couple of alternatives similar to ProductHQ, and while they were decent, ProductHQ stood out for its beautiful and simple design. Setting it up was a breeze, and I had the widget up and running on my website in just 10 minutes. Choosing ProductHQ was definitely the right decision for me!',
    },
    {
      authorName: 'Jack Graham',
      authorPosition: 'Co founder',
      testimonialMessage:
        "ProductHQ is amazing. It's changed the way we connect with our customers. Not only has it saved us heaps of money and time by avoiding unnecessary guesswork for upcoming features, but it also empowers our customers to directly influence the direction of our product.",
    },
    {
      authorName: 'Eve Crawford',
      authorPosition: 'Product Designer',
      testimonialMessage:
        'I experimented with a couple of alternatives similar to ProductHQ, and while they were decent, ProductHQ stood out for its beautiful and simple design. Setting it up was a breeze, and I had the widget up and running on my website in just 10 minutes. Choosing ProductHQ was definitely the right decision for me!',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const testimonialsDataItems = testimonialsData.map((block, idx) => (
    <div key={idx} className="test-block">
      <div className="block">
        <div className="authorInfo">
          <h6 className="name">{block.authorName}</h6>
          <h6 className="position">{block.authorPosition}</h6>
        </div>
        <div className="test-message">
          <p>{block.testimonialMessage}</p>
        </div>
        <div className="review-star">
          <img src="../static/images/review-stars.svg" alt="Stars" />
        </div>
      </div>
    </div>
  ));

  return <Slider {...settings}>{testimonialsDataItems}</Slider>;
}
