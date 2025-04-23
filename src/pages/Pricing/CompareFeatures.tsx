import { postApi } from '../../utils/api/api';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import useWindowWidth from '../../custom-hooks/useWindowWidth';
import { CheckoutSession, Plan, Price } from '../../types/billing';

export default function CompareFeatures({
  plan,
  tabView,
  setTabView,
}: {
  plan?: Plan;
  tabView: string;
  setTabView: Dispatch<SetStateAction<any>>;
}) {
  const width = useWindowWidth();
  const [subscribing, setSubscribing] = useState(false);

  const handleBuyPowerup = (powerup_price: Price) => {
    if (plan && plan.subscription?.can_purchase_powerup) {
      setSubscribing(true);
      postApi({
        url: 'billing/powerup',
        payload: {
          cancel_url: window.location.href,
          price_id: powerup_price.id,
          success_url: `http://${window.location.host}/success`,
        },
      })
        .then((res) => {
          setSubscribing(false);
          if (res.results.error) {
            toast(res.results.error, {
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
    } else {
      toast('You can only purchase this once on the starter or growth plan.', {
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
  };

  return (
    <>
      <div className="comparefeaturesSection">
        <div
          className="sectionTitleBlock"
          style={{
            borderBottomWidth: '1px',
          }}
        >
          <div className="dd-container">
            <div
              className="wrapper"
              style={{
                paddingBottom: '25px',
              }}
            >
              <div className="leftBlock">
                <div className="title">
                  <h5
                    style={{
                      color: '#09041A',
                      fontWeight: 700,
                      fontSize: '30px',
                    }}
                  >
                    Compare Features
                  </h5>
                </div>
              </div>
              <div className="rightBlock">
                <div
                  className={`tableTitleBlock scale ${
                    tabView === 'Scale' && width < 768 ? 'active' : ''
                  }`}
                  onClick={() => {
                    setTabView('Scale');
                  }}
                >
                  <h6
                    className="flex gap-2"
                    style={{
                      color: '#09041A',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    <img
                      src="https://s3.amazonaws.com/app.productfeedback.co/icon/scale-icon.svg"
                      alt=""
                    />
                    Scale
                  </h6>
                </div>
                <div
                  className={`tableTitleBlock growth ${
                    tabView === 'Growth' && width < 768 ? 'active' : ''
                  }`}
                  onClick={() => {
                    setTabView('Growth');
                  }}
                >
                  <h6
                    className="flex gap-2"
                    style={{
                      color: '#09041A',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    <img
                      src="https://s3.amazonaws.com/app.productfeedback.co/icon/growth-icon.svg"
                      alt=""
                    />
                    Growth
                  </h6>
                </div>
                <div
                  className={`tableTitleBlock starter ${
                    tabView === 'Starter' && width < 768 ? 'active' : ''
                  }`}
                  onClick={() => {
                    setTabView('Starter');
                  }}
                >
                  <h6
                    className="flex gap-2"
                    style={{
                      color: '#09041A',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    <img
                      src="https://s3.amazonaws.com/app.productfeedback.co/icon/starter-icon.svg"
                      alt=""
                    />
                    Starter
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tablesWrapper">
          <div className="dd-container">
            <div className="wrapper" style={{ marginTop: 'unset' }}>
              <div
                className="topTitle"
                style={{
                  borderBottomWidth: '1px',
                }}
              >
                <div className="leftBlock">
                  <div
                    className="title"
                    style={{ border: 'unset', marginTop: '10px' }}
                  >
                    <h5>Core Features</h5>
                  </div>
                </div>
              </div>
              <div className="leftBlock">
                <div className="tableItem">
                  <h6>Ideas</h6>
                </div>
                <div className="tableItem">
                  <h6>Custom domain + SSL</h6>
                </div>
                <div className="tableItem">
                  <h6>Customize branding</h6>
                </div>
                <div className="tableItem">
                  <h6>Board Privacy</h6>
                </div>
                <div className="tableItem">
                  <h6>Comments</h6>
                </div>
                <div className="tableItem">
                  <h6>Emoji reactions</h6>
                </div>
                <div className="tableItem">
                  <h6>Search and filter</h6>
                </div>
                <div className="tableItem">
                  <h6>Change user name display</h6>
                </div>
                <div className="tableItem">
                  <h6>Show/hide date/time</h6>
                </div>
                <div className="tableItem">
                  <h6>Hide from search engines</h6>
                </div>
                <div className="tableItem">
                  <h6>SSO</h6>
                </div>
                <div className="tableItem">
                  <h6>Tags</h6>
                </div>
                <div className="tableItem">
                  <h6>Email and chat support</h6>
                </div>
                <div className="tableItem">
                  <h6>Moderation</h6>
                </div>
                <div className="tableItem">
                  <h6>Prioritization</h6>
                </div>
                <div className="title">
                  <h5>USER TYPES</h5>
                </div>
                <div className="tableItem">
                  <h6>Super admins</h6>
                </div>
                <div className="tableItem">
                  <h6>Admins</h6>
                </div>
                <div className="tableItem">
                  <h6>Managers</h6>
                </div>
                <div className="tableItem">
                  <h6>Contributors</h6>
                </div>
                <div className="title">
                  <h5>IDEA MANAGEMENT</h5>
                </div>
                <div className="tableItem">
                  <h6>Ideas</h6>
                </div>
                <div className="tableItem">
                  <h6>Upvotes</h6>
                </div>
                <div className="tableItem">
                  <h6>Vote on behalf of</h6>
                </div>
                <div className="tableItem">
                  <h6>Create idea on behalf of</h6>
                </div>
                <div className="tableItem">
                  <h6>Comment reactions</h6>
                </div>
                <div className="tableItem">
                  <h6>Pinned Ideas</h6>
                </div>
                <div className="tableItem">
                  <h6>Pinned comments</h6>
                </div>
                <div className="tableItem">
                  <h6>@mentions</h6>
                </div>
                <div className="tableItem">
                  <h6>Hide comments</h6>
                </div>
                <div className="tableItem">
                  <h6>Internal comments</h6>
                </div>
                <div className="tableItem">
                  <h6>Idea submission</h6>
                </div>
                <div className="tableItem">
                  <h6>Show/hide upvote feature</h6>
                </div>
                <div className="title">
                  <h5>ROADMAP</h5>
                </div>
                <div className="tableItem">
                  <h6>Prioritize ideas</h6>
                </div>
                <div className="tableItem">
                  <h6>Add/delete columns</h6>
                </div>
                <div className="tableItem">
                  <h6>Rearrange columns</h6>
                </div>
                <div className="tableItem">
                  <h6>Rename columns</h6>
                </div>
                <div className="tableItem">
                  <h6>Custom heading colours</h6>
                </div>
                <div className="tableItem">
                  <h6>Estimated release date</h6>
                </div>
                <div className="tableItem">
                  <h6>Show/hide roadmap feature</h6>
                </div>
                <div className="title">
                  <h5>{` WHAT'S NEW `}</h5>
                </div>
                <div className="tableItem">
                  <h6>Create post</h6>
                </div>
                <div className="tableItem">
                  <h6>Save as draft</h6>
                </div>
                <div className="tableItem">
                  <h6>Scheduled posts</h6>
                </div>
                <div className="tableItem">
                  <h6>Markup</h6>
                </div>
                <div className="tableItem">
                  <h6>Reactions</h6>
                </div>
                <div className="tableItem">
                  <h6>Categories</h6>
                </div>
                <div className="tableItem">
                  <h6>Pinned posts</h6>
                </div>
                <div className="tableItem">
                  <h6>Social sharing</h6>
                </div>
                <div className="tableItem">
                  <h6>{` Show/hide What's New feature `}</h6>
                </div>
                <div className="title">
                  <h5>INTEGRATIONS</h5>
                </div>
                <div className="tableItem">
                  <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/intercom-logo.svg" />
                </div>
                <div className="tableItem">
                  <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/jira-logo.svg" />
                </div>
                <div className="tableItem">
                  <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/zapier-logo.svg" />
                </div>
                <div className="title">
                  <h5>NEW FEATURES</h5>
                </div>
                <div className="tableItem">
                  <h6>R.I.C.E. prioritization</h6>
                </div>
                <div className="tableItem">
                  <h6>Customer profiles</h6>
                </div>
                <div className="tableItem">
                  <h6>Customer tracking</h6>
                </div>
                <div className="tableItem">
                  <h6>Segmentation</h6>
                </div>
                <div className="bigtitle">
                  <h5
                    style={{
                      color: '#09041A',
                      fontWeight: 700,
                      fontSize: '30px',
                    }}
                  >
                    Add-ons
                  </h5>
                </div>
                <div className="tableItem">
                  <h6>Remove ProductHQ branding</h6>
                </div>
              </div>
              <div className="rightBlock">
                {(width < 768 && tabView === 'Scale') || width > 767 ? (
                  <div className="tableBlock">
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom domain + SSL</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customize branding</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Board Privacy</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Emoji reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Search and filter</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Change user name display</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide date/time</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide from search engines</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>SSO</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Tags</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Email and chat support</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Moderation</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritization</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>USER TYPES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Super admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Managers</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Contributors</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="title">
                      <h5>IDEA MANAGEMENT</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Upvotes</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Vote on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Create idea on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comment reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>@mentions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Internal comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Idea submission</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide upvote feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>ROADMAP</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritize ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Add/delete columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rearrange columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rename columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom heading colours</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Estimated release date</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide roadmap feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>{` WHAT'S NEW `}</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Create post</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Save as draft</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Scheduled posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Markup</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Categories</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Social sharing</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>{` Show/hide What's New feature `}</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>INTEGRATIONS</h5>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/intercom-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/jira-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/zapier-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="title">
                      <h5>NEW FEATURES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>R.I.C.E. prioritization</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer profiles</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer tracking</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Segmentation</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="bigtitle">
                      <h5>Add-ons</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Remove ProductHQ branding</h6>
                      <h6>Included</h6>
                    </div>
                  </div>
                ) : null}
                {(width < 768 && tabView === 'Growth') || width > 767 ? (
                  <div className="tableBlock">
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>150</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom domain + SSL</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customize branding</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Board Privacy</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Emoji reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Search and filter</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Change user name display</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide date/time</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide from search engines</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>SSO</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Tags</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Email and chat support</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Moderation</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritization</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>USER TYPES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Super admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Managers</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Contributors</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="title">
                      <h5>IDEA MANAGEMENT</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Upvotes</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Vote on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Create idea on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comment reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>@mentions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Internal comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Idea submission</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide upvote feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>ROADMAP</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritize ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Add/delete columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rearrange columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rename columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom heading colours</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Estimated release date</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide roadmap feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>{` WHAT'S NEW `}</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Create post</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Save as draft</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Scheduled posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Markup</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Categories</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Social sharing</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>{` Show/hide What's New feature `}</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>INTEGRATIONS</h5>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/intercom-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/jira-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/zapier-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="title">
                      <h5>NEW FEATURES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>R.I.C.E. prioritization</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer profiles</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer tracking</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Segmentation</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="bigtitle">
                      <h5>Add-ons</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Remove ProductHQ branding</h6>
                      <h6>
                        <a
                          className={`btn ${subscribing ? 'disabled' : ''}`}
                          onClick={() => {
                            if (subscribing) return;
                            if (plan) {
                              const powerup_price =
                                tabView === 'monthly'
                                  ? plan?.monthly.powerups[0]
                                  : plan?.yearly.powerups[0];
                              handleBuyPowerup(powerup_price);
                            }
                          }}
                        >
                          Buy now
                        </a>
                      </h6>
                    </div>
                  </div>
                ) : null}
                {(width < 768 && tabView === 'Starter') || width > 767 ? (
                  <div className="tableBlock">
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>50</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom domain + SSL</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customize branding</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Board Privacy</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Emoji reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Search and filter</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Change user name display</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide date/time</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide from search engines</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>SSO</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Tags</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Email and chat support</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Moderation</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritization</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>USER TYPES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Super admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Admins</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Managers</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Contributors</h6>
                      <h6>Unlimited</h6>
                    </div>
                    <div className="title">
                      <h5>IDEA MANAGEMENT</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Upvotes</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Vote on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Create idea on behalf of</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Comment reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned Ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>@mentions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Hide comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Internal comments</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Idea submission</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide upvote feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>ROADMAP</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Prioritize ideas</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Add/delete columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rearrange columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Rename columns</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Custom heading colours</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Estimated release date</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Show/hide roadmap feature</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>{` WHAT'S NEW `}</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Create post</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Save as draft</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Scheduled posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Markup</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Reactions</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Categories</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Pinned posts</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>Social sharing</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="tableItem">
                      <h6>{` Show/hide What's New feature `}</h6>
                      <h6>
                        <img
                          src="./static/images/checkMarkSquare.svg"
                          alt=""
                          className="icon"
                        />
                      </h6>
                    </div>
                    <div className="title">
                      <h5>INTEGRATIONS</h5>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/intercom-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/jira-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>
                        <img src="https://s3.amazonaws.com/app.productfeedback.co/assets/img/zapier-logo.svg" />
                      </h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="title">
                      <h5>NEW FEATURES</h5>
                    </div>
                    <div className="tableItem">
                      <h6>R.I.C.E. prioritization</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer profiles</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Customer tracking</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="tableItem">
                      <h6>Segmentation</h6>
                      <h6>Coming Soon</h6>
                    </div>
                    <div className="bigtitle">
                      <h5>Add-ons</h5>
                    </div>
                    <div className="tableItem">
                      <h6>Remove ProductHQ branding</h6>
                      <h6>
                        <a
                          className={`btn ${subscribing ? 'disabled' : ''}`}
                          onClick={() => {
                            if (subscribing) return;
                            if (plan) {
                              const powerup_price =
                                tabView === 'monthly'
                                  ? plan?.monthly.powerups[0]
                                  : plan?.yearly.powerups[0];
                              handleBuyPowerup(powerup_price);
                            }
                          }}
                        >
                          Buy now
                        </a>
                      </h6>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
