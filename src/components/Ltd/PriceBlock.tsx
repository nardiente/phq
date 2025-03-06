import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getKaslKey } from '../../utils/localStorage';
import { useTranslation } from 'react-i18next';
import {
  CheckoutSession,
  LifetimeDeal,
  Price,
  Subscription,
} from '../../types/billing';
import { postApi } from '../../utils/api/api';

interface Props {
  lifetimeDeal: LifetimeDeal;
}

export default function PriceBlock({ lifetimeDeal }: Props) {
  const { t } = useTranslation();

  const is_logged_in = getKaslKey() !== undefined;

  const [priceData, setPriceData] = useState<any[]>([]);
  const [subscription, setSubsciption] = useState<Subscription | null>(
    lifetimeDeal.subscription
  );

  const [purchasing, setPurchasing] = React.useState(false);

  // downgrading
  const [downgrade_plan, setDowngradePlan] = React.useState<Price>();
  const [downgrading, setDowngrading] = React.useState<boolean>(false);
  const [number_ideas, setNumberIdeas] = React.useState<number>(0);

  useEffect(() => {
    setPriceData([
      {
        id: lifetimeDeal.deals[0].id,
        planName: lifetimeDeal.deals[0].planName,
        price: lifetimeDeal.deals[0].price,
        planValidity: 'Lifetime deal',
        commonFeatures: [
          'Ideas - 50',
          'Contributors -',
          'Upvotes -',
          'What’s New posts -',
          'Real-time comments -',
          'Team Members -',
        ],
        uniqueFeatures: [
          '60 Day money back guarantee',
          'Human-centered design',
          'Upvote feature',
          'Roadmap feature',
          'What’s New feature',
          'Admin portal',
          'Admin badges',
          'Hide comments',
          'Verify new users',
          'Custom domain + SSL',
          'Customize to match branding',
          'Whitelisted domains',
          'Hide upvote, roadmap, what’s new',
          'Tag ideas and posts',
          'Emoji reactions',
          'Search and filter by tags',
        ],
      },
      {
        id: lifetimeDeal.deals[1].id,
        planName: lifetimeDeal.deals[1].planName,
        price: lifetimeDeal.deals[1].price,
        planValidity: 'Lifetime deal',
        commonFeatures: [
          'Ideas - 150',
          'Contributors -',
          'Upvotes -',
          'What’s New posts -',
          'Real-time comments -',
          'Team Members -',
        ],
        uniqueFeatures: [
          '60 Day money back guarantee',
          'Human-centered design',
          'Upvote feature',
          'Roadmap feature',
          'What’s New feature',
          'Admin portal',
          'Admin badges',
          'Hide comments',
          'Verify new users',
          'Custom domain + SSL',
          'Customize to match branding',
          'Whitelisted domains',
          'Hide upvote, roadmap, what’s new',
          'Tag ideas and posts',
          'Emoji reactions',
          'Search and filter by tags',
        ],
      },
      {
        id: lifetimeDeal.deals[2].id,
        planName: lifetimeDeal.deals[2].planName,
        price: lifetimeDeal.deals[2].price,
        planValidity: 'Lifetime deal',
        commonFeatures: [
          'Ideas -',
          'Contributors -',
          'Upvotes -',
          'What’s New posts -',
          'Real-time comments -',
          'Team Members -',
        ],
        uniqueFeatures: [
          '60 Day money back guarantee',
          'Human-centered design',
          'Upvote feature',
          'Roadmap feature',
          'What’s New feature',
          'Admin portal',
          'Admin badges',
          'Hide comments',
          'Verify new users',
          'Custom domain + SSL',
          'Customize to match branding',
          'Whitelisted domains',
          'Hide upvote, roadmap, what’s new',
          'Tag ideas and posts',
          'Emoji reactions',
          'Search and filter by tags',
        ],
      },
    ]);

    setSubsciption(lifetimeDeal.subscription);
  }, [lifetimeDeal]);

  const checkIsDowngrading = (price: any) => {
    if (
      subscription &&
      subscription.price_ids &&
      subscription.price_ids.length > 0
    ) {
      const currSubIdx: number = priceData
        .map((p) => p.id)
        .indexOf(subscription.price_ids[0]);
      const selectedSubIdx: number = priceData
        .map((p) => p.id)
        .indexOf(price.id);

      switch (selectedSubIdx) {
        case 0:
          setNumberIdeas(50);
          break;
        case 1:
          setNumberIdeas(150);
          break;
        default:
          break;
      }

      if (selectedSubIdx < currSubIdx) {
        setDowngradePlan(price);
        setDowngrading(true);
      }

      return selectedSubIdx < currSubIdx;
    }

    return false;
  };

  const checkout = (price: any) => {
    setPurchasing(true);
    postApi({
      url: 'billing/checkout',
      payload: {
        cancel_url: window.location.href,
        price_ids: [price.id],
        success_url: `http://${window.location.host}/${
          is_logged_in ? 'success' : 'sign-up'
        }`,
      },
    }).then((res) => {
      setPurchasing(false);
      if (res.results.error) {
        toast(t(res.results.error).replace('this', 'other'), {
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
    });
  };

  const onPurchase = (price: any) => {
    if (!checkIsDowngrading(price)) {
      checkout(price);
    }
  };

  return (
    <>
      {priceData.map((block, j) => (
        <div className="price-block" key={j}>
          <div className="title-block">
            <h3>{block.planName}</h3>
            <label>Popular</label>
          </div>
          <div className="body-block">
            <h6>One Time Purchase of</h6>
            <div className="price-block">
              <h4>{block.price}</h4>{' '}
              <span className="validity-label">{block.planValidity}</span>
            </div>
            <ul>
              {block.commonFeatures?.map((cf: any, i: number) => (
                <li className="hasBg" key={`common-${i}`}>
                  <span className="icon">
                    <img
                      src="../static/images/checkmark-icon.svg"
                      alt="Checkmark Icon"
                    />
                  </span>
                  {i === 0 && j !== 2 ? (
                    <span className="text">{cf}</span>
                  ) : (
                    <span className="text">
                      {cf} <span>Unlimited</span>
                    </span>
                  )}
                </li>
              ))}
              {block.uniqueFeatures?.map((uf: any, i: number) => (
                <li key={`unique-${i}`}>
                  <span className="icon">
                    <img
                      src="../static/images/checkmark-icon.svg"
                      alt="Checkmark Icon"
                    />
                  </span>
                  <span className="text">{uf}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="button-block">
            <button
              className={`${
                (lifetimeDeal.subscription?.price_ids?.includes(block.id)
                  ? 'purchased'
                  : '') + (purchasing ? ' disabled' : '')
              }`}
              onClick={() => {
                if (!purchasing) {
                  onPurchase(block);
                }
              }}
              disabled={purchasing}
            >
              Purchase Now
            </button>
          </div>
        </div>
      ))}
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
            className={`${purchasing ? '' : 'is-clickable '}cancel-button`}
            disabled={purchasing}
            onClick={() => setDowngrading(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`${purchasing ? '' : 'is-clickable '}delete-button`}
            disabled={purchasing}
            onClick={() => {
              if (downgrade_plan) {
                checkout(downgrade_plan);
              }
            }}
            type="button"
          >
            Downgrade
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
