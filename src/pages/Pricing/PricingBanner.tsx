import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { postApi } from '../../utils/api/api';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './pricing.css';
import { CheckoutSession, Feature, Plan, Price } from '../../types/billing';
import { useTranslation } from 'react-i18next';
import { getKaslKey } from '../../utils/localStorage';

export default function PricingBanner({
  features,
  plan,
  tabView,
  setTabView,
}: {
  features: Feature[];
  plan?: Plan;
  tabView: string;
  setTabView: Dispatch<SetStateAction<string>>;
}) {
  const { t } = useTranslation();

  const [fetching, setFetching] = useState<boolean>(true);
  const [downgrade_plan, setDowngradePlan] = useState<Price>();
  const [downgrading, setDowngrading] = useState<boolean>(false);
  const [number_ideas, setNumberIdeas] = useState<number>(0);
  const [subscribe_plan, setSubscribePlan] = useState<Price>();
  const [subscribing, setSubscribing] = useState(false);

  const is_logged_in = getKaslKey() !== undefined;

  useEffect(() => {
    setFetching(
      (prev) => plan?.monthly.plans.every((plan) => plan.id === '') ?? prev
    );
  }, [plan]);

  const checkIsDowngrading = (subscribe_plan: Price) => {
    if (plan == undefined || plan.subscription == undefined) return false;

    const subscription = plan.subscription;
    const monthly_plans = plan.monthly.plans;
    const yearly_plans = plan.yearly.plans;

    let current_plan = monthly_plans.find(
      (monthly_plan) =>
        monthly_plan.id ===
        subscription.prices.find((price) => price.active)?.id
    );
    if (current_plan === undefined) {
      current_plan = yearly_plans.find(
        (yearly_plan) =>
          yearly_plan.id ===
          subscription.prices.find((price) => price.active)?.id
      );
    }

    let subscribe = monthly_plans.find(
      (monthly_plan) => monthly_plan.id === subscribe_plan.id
    );
    if (subscribe === undefined) {
      subscribe = yearly_plans.find(
        (yearly_plan) => yearly_plan.id === subscribe_plan.id
      );
    }

    return (
      subscription?.status == 'active' &&
      current_plan?.product.name !== subscribe?.product.name &&
      ((subscribe?.product.name.toLowerCase() === 'starter' &&
        ['growth', 'scale'].includes(
          current_plan?.product.name.toLowerCase() ?? ''
        )) ||
        (subscribe?.product.name.toLowerCase() === 'growth' &&
          ['scale'].includes(
            current_plan?.product.name.toLowerCase() ?? ''
          ))) &&
      (subscribe?.amount ?? 0) < (current_plan?.amount ?? 0)
    );
  };

  const createCheckoutSession = (
    subscribe_plan: Price,
    free_trial: boolean
  ) => {
    const description = subscribe_plan.product.name;
    const prices = [subscribe_plan.id];

    setSubscribing(true);
    postApi({
      url: 'billing/subscribe',
      payload: {
        cancel_url: window.location.href,
        description,
        free_trial,
        success_url: `http://${window.location.host}/billing`,
        prices,
      },
    })
      .then((res) => {
        setSubscribing(false);
        if (res.results.error) {
          toast(t(res.results.error), {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            bodyClassName: 'p-2',
            className: 'custom-theme',
          });
        }
        if (res.results.data) {
          const data = res.results.data as CheckoutSession;
          window.location.href = data.url;
        }
      })
      .catch(() => {
        setSubscribing(false);
      });
  };

  const handleStartTrial = (subscribe_plan: Price) => {
    setSubscribePlan(subscribe_plan);
    if (is_logged_in && plan) {
      createCheckoutSession(subscribe_plan, true);
    } else {
      const description = subscribe_plan.product.name;
      window.location.href = `http://${window.location.host}/sign-up?plan=${subscribe_plan.id}&description=${description}`;
    }
  };

  const subscribe = (subscribe_plan: Price) => {
    setSubscribePlan(subscribe_plan);
    if (checkIsDowngrading(subscribe_plan)) {
      const idea_feature = features.find((feature) => feature.tag == 'ideas');
      switch (subscribe_plan.product.name.toLowerCase()) {
        case 'starter':
          setNumberIdeas(Number(idea_feature?.starter));
          break;
        case 'growth':
          setNumberIdeas(Number(idea_feature?.growth));
          break;
        default:
          break;
      }
      setDowngradePlan(subscribe_plan);
      setDowngrading(true);
    } else {
      createCheckoutSession(subscribe_plan, false);
    }
  };

  return (
    <>
      <div className="pricingBanner">
        <div className="bannerImage">
          <img src="./static/images/PricingBannerImage.jpg" alt="" />
        </div>
        <div className="dd-container">
          <div className="bannerContent">
            <h6
              style={{
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              ProductHQ Pricing
            </h6>
            <h1
              style={{
                fontWeight: 700,
                fontSize: '50px',
              }}
            >
              Build the right features, <br />
              not expensive mistakes
            </h1>
            <p>
              {`Start your free trial and build products users can't live without`}
            </p>
          </div>

          <div className="pricingTabs">
            <div className="priceTabsNav">
              <ul>
                <li
                  onClick={() => setTabView('monthly')}
                  className={`${tabView === 'monthly' ? 'active' : ''}`}
                >
                  <a>Monthly</a>
                </li>
                <li
                  onClick={() => setTabView('yearly')}
                  className={`${tabView === 'yearly' ? 'active' : ''}`}
                >
                  <a>
                    Yearly <span>2 months free</span>
                  </a>
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
                            <img src="./static/images/scale-icon.svg" alt="" />
                            {plan?.monthly.plans[2].product.name}
                          </h6>
                          <p>
                            Maximize feedback impact across your entire
                            organization
                          </p>
                          <h4>
                            ${plan?.monthly.plans[2].amount}/<span>month</span>{' '}
                            <span>
                              <del>$98</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.monthly.plans[2]);
                                } else {
                                  handleStartTrial(plan.monthly.plans[2]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.monthly.plans[2].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.monthly.plans[2].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.monthly.plans[2].id ? '...' : ''}`}
                            </a>
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
                            <img src="./static/images/growth-icon.svg" alt="" />
                            {plan?.monthly.plans[1].product.name}
                          </h6>
                          <p>
                            Amplify your product insights as your team
                            expands{' '}
                          </p>
                          <h4>
                            ${plan?.monthly.plans[1].amount}/<span>month</span>{' '}
                            <span>
                              <del>$49</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.monthly.plans[1]);
                                } else {
                                  handleStartTrial(plan.monthly.plans[1]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.monthly.plans[1].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.monthly.plans[1].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.monthly.plans[1].id ? '...' : ''}`}
                            </a>
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
                              src="./static/images/starter-icon.svg"
                              alt=""
                            />
                            {plan?.monthly.plans[0].product.name}
                          </h6>
                          <p>
                            Begin your feedback journey with essential tools
                          </p>
                          <h4>
                            ${plan?.monthly.plans[0].amount}/<span>month</span>{' '}
                            <span>
                              <del>$24</del>/month
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.monthly.plans[0]);
                                } else {
                                  handleStartTrial(plan.monthly.plans[0]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.monthly.plans[0].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.monthly.plans[0].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.monthly.plans[0].id ? '...' : ''}`}
                            </a>
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
                            <img src="./static/images/scale-icon.svg" alt="" />
                            {plan?.yearly.plans[2].product.name}
                          </h6>
                          <p>
                            Maximize feedback impact across your entire
                            organization
                          </p>
                          <h4>
                            ${plan?.yearly.plans[2].amount}/<span>year</span>{' '}
                            <span>
                              <del>$980</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.yearly.plans[2]);
                                } else {
                                  handleStartTrial(plan.yearly.plans[2]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.yearly.plans[2].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.yearly.plans[2].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.yearly.plans[2].id ? '...' : ''}`}
                            </a>
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
                            <img src="./static/images/growth-icon.svg" alt="" />
                            {plan?.yearly.plans[1].product.name}
                          </h6>
                          <p>
                            Amplify your product insights as your team
                            expands{' '}
                          </p>
                          <h4>
                            ${plan?.yearly.plans[1].amount}/<span>year</span>{' '}
                            <span>
                              <del>$490</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.yearly.plans[1]);
                                } else {
                                  handleStartTrial(plan.yearly.plans[1]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.yearly.plans[1].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.yearly.plans[1].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.yearly.plans[1].id ? '...' : ''}`}
                            </a>
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
                              src="./static/images/starter-icon.svg"
                              alt=""
                            />
                            {plan?.yearly.plans[0].product.name}
                          </h6>
                          <p>
                            Begin your feedback journey with essential tools
                          </p>
                          <h4>
                            ${plan?.yearly.plans[0].amount}/<span>year</span>{' '}
                            <span>
                              <del>$240</del>/year
                            </span>
                          </h4>
                          <div className="btn-block">
                            <a
                              className={
                                subscribing || fetching ? 'disabled' : ''
                              }
                              onClick={() => {
                                if (subscribing || fetching || !plan) return;
                                if (plan.subscription) {
                                  subscribe(plan.yearly.plans[0]);
                                } else {
                                  handleStartTrial(plan.yearly.plans[0]);
                                }
                              }}
                            >
                              {plan && plan.subscription
                                ? `Subscrib${subscribing && subscribe_plan?.id === plan.yearly.plans[0].id ? 'ing...' : 'e'}`
                                : `Start${subscribing && subscribe_plan?.id === plan?.yearly.plans[0].id ? 'ing' : ''} your free trial${subscribing && subscribe_plan?.id === plan?.yearly.plans[0].id ? '...' : ''}`}
                            </a>
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
      <Modal
        centered={true}
        className="downgrade-modal"
        contentClassName="content-container"
        isOpen={downgrading}
      >
        <ModalHeader className="popup-title">
          <div
            className="is-clickable x-close"
            onClick={() => setDowngrading(false)}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </ModalHeader>
        <ModalBody className="popup-body">
          <div>
            If you downgrade, you can only administer the top {number_ideas}{' '}
            ideas. For the remaining ideas.
          </div>
          <div style={{ paddingTop: '15px' }}>Admins will NOT be able to:</div>
          <ul>
            <li>Edit the idea or tags</li>
            <li>Add/edit/delete/reply to comments</li>
            <li>Move/Prioritise the idea</li>
          </ul>
          <div style={{ paddingTop: '15px' }}>You will still be able to:</div>
          <ul>
            <li>Delete ideas</li>
            <li>Receive upvotes and comments from customers</li>
          </ul>
        </ModalBody>
        <ModalFooter className="popup-footer">
          <button
            className={`${
              subscribing || fetching ? '' : 'is-clickable '
            }cancel-button`}
            disabled={subscribing || fetching}
            onClick={() => setDowngrading(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`${
              subscribing || fetching ? '' : 'is-clickable '
            }delete-button`}
            disabled={subscribing || fetching}
            onClick={() => {
              if (downgrade_plan) {
                createCheckoutSession(downgrade_plan, false);
              }
            }}
            type="button"
          >
            {`Downgrad${subscribing ? 'ing...' : 'e'}`}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
