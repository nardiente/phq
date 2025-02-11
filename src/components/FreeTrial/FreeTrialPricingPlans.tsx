import { useState } from 'react';
import { Plan, Price } from '../../types/billing';

export default function FreeTrialPricingPlans({ plan }: { plan?: Plan }) {
  const [tabView, setTabView] = useState<string>('monthly');

  const handleSignUpRedirect = (subscribe_plan: Price) => {
    const description = subscribe_plan.product.name;
    window.location.href = `https://app.producthq.io/sign-up?plan=${subscribe_plan.id}&description=${description}`;
  };

  return (
    <>
      <div className="pricingPlans" id="pricingPlansId">
        <div className="dd-container">
          <div className="bannerContent">
            <h2>
              Cheaper and faster than <br />
              expensive mistakes
            </h2>
            <p>
              {`Start your free trial and build products users can't live without`}
            </p>
          </div>

          <div className="pricingTabs">
            <div className="priceTabsNav">
              <ul>
                <li className={`${tabView === 'monthly' ? 'active' : ''}`}>
                  <button onClick={() => setTabView('monthly')}>Monthly</button>
                </li>
                <li className={`${tabView === 'yearly' ? 'active' : ''}`}>
                  <button onClick={() => setTabView('yearly')}>
                    Yearly <span>2 months free</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="priceTabsContent">
              {tabView === 'monthly' ? (
                <div className="pricesBlocks" id="monthly">
                  <div className="pricesBlocksWrapper">
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/scale-icon.svg"
                              alt=""
                            />
                            Scale
                          </h6>
                          <p>
                            Maximize feedback impact across your entire
                            organization
                          </p>
                          <h4>
                            ${plan?.monthly.plans[2].amount}/<span>month</span>{' '}
                            <span className="extra">
                              <del>$98</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.monthly.plans[2]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/growth-icon.svg"
                              alt=""
                            />
                            Growth
                          </h6>
                          <p>
                            Amplify your product insights as your team expands{' '}
                          </p>
                          <h4>
                            ${plan?.monthly.plans[1].amount}/<span>month</span>{' '}
                            <span className="extra">
                              <del>$49</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.monthly.plans[1]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/starter-icon.svg"
                              alt=""
                            />
                            Starter
                          </h6>
                          <p>
                            Begin your feedback journey with essential tools
                          </p>
                          <h4>
                            ${plan?.monthly.plans[0].amount}/<span>month</span>{' '}
                            <span className="extra">
                              <del>$24</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.monthly.plans[0]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pricesBlocks" id="yearly">
                  <div className="pricesBlocksWrapper">
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/scale-icon.svg"
                              alt=""
                            />
                            Scale
                          </h6>
                          <p>
                            Maximize feedback impact across your entire
                            organization
                          </p>
                          <h4>
                            ${plan?.yearly.plans[2].amount}/<span>year</span>{' '}
                            <span className="extra">
                              <del>$980</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.yearly.plans[2]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/growth-icon.svg"
                              alt=""
                            />
                            Growth
                          </h6>
                          <p>
                            Amplify your product insights as your team expands{' '}
                          </p>
                          <h4>
                            ${plan?.yearly.plans[1].amount}/<span>year</span>{' '}
                            <span className="extra">
                              <del>$500</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.yearly.plans[1]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="priceItem">
                      <div className="priceBlock">
                        <div className="offerText">
                          <span>Early Adopter Offer: 50% Off</span>
                        </div>
                        <div className="contentText">
                          <h6>
                            <img
                              src="../../static/images/starter-icon.svg"
                              alt=""
                            />
                            Starter
                          </h6>
                          <p>
                            Begin your feedback journey with essential tools
                          </p>
                          <h4>
                            ${plan?.yearly.plans[0].amount}/<span>year</span>{' '}
                            <span className="extra">
                              <del>$240</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <button
                              onClick={() => {
                                if (plan) {
                                  handleSignUpRedirect(plan.yearly.plans[0]);
                                }
                              }}
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
