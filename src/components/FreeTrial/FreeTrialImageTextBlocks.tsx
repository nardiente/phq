export default function FreeTrialImageTextBlocks() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricingPlansId');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <div className="imageTextBlocksSection">
        <div className="sectionTitle">
          <div className="custom-container">
            <h2>
              Everything You Need to Build <br></br>What Customers Actually Want
            </h2>
            <p>
              Stop switching between tools. ProductHQ gives you all the
              essential <br></br>features in one integrated platform.
            </p>
          </div>
        </div>
        <div className="wrapper">
          <div className="imageTextItemBlock">
            <div className="custom-container">
              <div className="imageTextItemWrapper">
                <div className="textBlock">
                  <h2>Turn Customer Feedback into Clear Product Priorities</h2>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Collect and organize feature requests automatically
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Let customers vote on what matters most
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Identify top priorities with data, not guesswork
                      </span>
                    </li>
                  </ul>
                  <div className="buttonBlock">
                    <button className="solidBtn" onClick={scrollToPricing}>
                      Start Your 14-Day Free Trial
                    </button>
                  </div>
                </div>
                <div className="imageBlock">
                  <img src="../../static/images/TurnCustomerFeedbackintoClearProduct.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="imageTextItemBlock">
            <div className="custom-container">
              <div className="imageTextItemWrapper">
                <div className="textBlock">
                  <h2>Build Trust with a Transparent Product Roadmap</h2>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Share your vision and planned features
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        {` Keep customers excited about what's coming `}
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Update status and progress automatically
                      </span>
                    </li>
                  </ul>
                  <div className="buttonBlock">
                    <button className="solidBtn" onClick={scrollToPricing}>
                      Start Your 14-Day Free Trial
                    </button>
                  </div>
                </div>
                <div className="imageBlock">
                  <img src="../../static/images/BuildTrustwithTransparentProductRoadmap.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="imageTextItemBlock">
            <div className="custom-container">
              <div className="imageTextItemWrapper">
                <div className="textBlock">
                  <h2>Announce Updates Where Your Users Already Are</h2>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Share product changes and new features
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Embed announcements directly in your app
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">{` Track who's seen each update `}</span>
                    </li>
                  </ul>
                  <div className="buttonBlock">
                    <button className="solidBtn" onClick={scrollToPricing}>
                      Start Your 14-Day Free Trial
                    </button>
                  </div>
                </div>
                <div className="imageBlock">
                  <img src="../../static/images/AnnounceUpdatesWhereYourUsersAlreadyAre.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
