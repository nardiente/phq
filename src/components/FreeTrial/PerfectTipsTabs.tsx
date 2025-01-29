import { useState } from 'react';

export default function PerfectTipsTabs() {
  const [tab, setTab] = useState(0);

  const onChangeTab = (value: number) => {
    setTab(value);
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricingPlansId');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="perfectTipsTabs">
        <div className="custom-container">
          <div className="sectionTitle">
            <h2>
              Find Your Perfect Fit: <br></br>Solutions Tailored to Your Role
            </h2>
          </div>
          <div className="tipTabsNav">
            <ul>
              <li
                onClick={() => onChangeTab(0)}
                className={tab == 0 ? 'active' : ''}
              >
                <a>
                  <span>Product Managers</span>
                </a>
              </li>
              <li
                onClick={() => onChangeTab(1)}
                className={tab == 1 ? 'active' : ''}
              >
                <a>
                  <span>Developers</span>
                </a>
              </li>
              <li
                onClick={() => onChangeTab(2)}
                className={tab == 2 ? 'active' : ''}
              >
                <a>
                  <span>SaaS Founders</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="tipTabsContent">
            {tab == 0 && (
              <div className="imageTextBlock">
                <div className="imageBlock">
                  <img
                    src="../../static/images/TurnCustomerImage.jpg"
                    alt="TurnCustomerImage"
                  />
                </div>
                <div className="textBlock">
                  <h2>Turn Customer Feedback into Product Success</h2>
                  <p>
                    Tired of scattered feedback and endless feature debates?
                  </p>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Cut feature planning time by 50% with automated feedback
                        organization
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Make confident roadmap decisions backed by real user
                        data
                      </span>
                    </li>

                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Show stakeholders exactly why each feature matters
                      </span>
                    </li>
                  </ul>
                  <button className="solidBtn" onClick={scrollToPricing}>
                    Start free trial
                  </button>
                </div>
              </div>
            )}
            {tab == 1 && (
              <div className="imageTextBlock">
                <div className="imageBlock">
                  <img
                    src="../../static/images/BuildWhatMattersImage.jpg"
                    alt="TurnCustomerImage"
                  />
                </div>
                <div className="textBlock">
                  <h2>Turn Customer Feedback into Product Success</h2>
                  <p>
                    Tired of scattered feedback and endless feature debates?
                  </p>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Cut feature planning time by 50% with automated feedback
                        organization
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Make confident roadmap decisions backed by real user
                        data
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Show stakeholders exactly why each feature matters
                      </span>
                    </li>
                  </ul>
                  <button className="solidBtn" onClick={scrollToPricing}>
                    Start free trial
                  </button>
                </div>
              </div>
            )}
            {tab == 2 && (
              <div className="imageTextBlock">
                <div className="imageBlock">
                  <img
                    src="../../static/images/GrowFasterImage.jpg"
                    alt="TurnCustomerImage"
                  />
                </div>
                <div className="textBlock">
                  <h2>Turn Customer Feedback into Product Success</h2>
                  <p>
                    Tired of scattered feedback and endless feature debates?
                  </p>
                  <ul>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Increase user retention by building what customers
                        actually need
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Reduce churn by showing customers their feedback matters
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <img src="../../static/images/checkmark-icon.svg" />
                      </span>
                      <span className="text">
                        Make every development sprint count with validated
                        feature priorities
                      </span>
                    </li>
                  </ul>
                  <button className="solidBtn" onClick={scrollToPricing}>
                    Start free trial
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
