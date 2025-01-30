import Slider from 'react-slick';

export default function SignupsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="signup-sliders-section">
      <div className="dd-container">
        <div className="section-title">
          <h2 className="text-[48px] font-bold">Coming soon...</h2>
          <p>Segments, R.I.C.E Prioritisation, and User Profiles</p>
        </div>
        <div className="wrapper">
          <Slider {...settings}>
            <div className="slider-block">
              <div className="image-block">
                <img src="../static/images/sign-ups-image.jpg" alt="" />
              </div>
            </div>
            <div className="slider-block">
              <div className="image-block">
                <img src="../static/images/Customer-Profiles-1.png" alt="" />
              </div>
            </div>
            <div className="slider-block">
              <div className="image-block">
                <img src="../static/images/RICE.png" alt="" />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
