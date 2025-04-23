export default function Testimonials() {
  return (
    <>
      <div className="pricingTestimonialsWarpper">
        <div className="dd-container">
          <div className="testimonialsWarpper">
            <div className="testItem">
              <div className="testBlock">
                <div className="titleBlock">
                  <h5
                    style={{
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    Aura Brooks <span>|</span>{' '}
                    <img src="./static/images/reviewStars.svg" alt="" />
                  </h5>
                  <h6>Graphic Designer</h6>
                </div>
                <div className="contentBlock">
                  <p>{`I've tested out all the other products on the market, but ProductHQ takes the cake when it comes to user interface and experience. The team behind it is constantly rolling out new features at an incredible pace, which is really impressive.`}</p>
                </div>
              </div>
            </div>
            <div className="testItem">
              <div className="testBlock">
                <div className="titleBlock">
                  <h5
                    style={{
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    Jack Graham <span>|</span>{' '}
                    <img src="./static/images/reviewStars.svg" alt="" />
                  </h5>
                  <h6>Co-founder</h6>
                </div>
                <div className="contentBlock">
                  <p>{`ProductHQ is amazing. It's changed the way we connect with our customers. Not only has it saved us heaps of money and time by avoiding unnecessary guesswork for upcoming features, but it also empowers our customers to directly influence the direction of our product.`}</p>
                </div>
              </div>
            </div>
            <div className="testItem">
              <div className="testBlock">
                <div className="titleBlock">
                  <h5
                    style={{
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    Eve Crawford <span>|</span>{' '}
                    <img src="./static/images/reviewStars.svg" alt="" />
                  </h5>
                  <h6>Product Designer</h6>
                </div>
                <div className="contentBlock">
                  <p>{`I experimented with a couple of alternatives similar to ProductHQ, and while they were decent, ProductHQ stood out for its beautiful and simple design. Setting it up was a breeze, and I had the widget up and running on my website in just 10 minutes. Choosing ProductHQ was definitely the right decision for me!`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
