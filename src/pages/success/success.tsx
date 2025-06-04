import './styles.css';
import queryString from 'query-string';
import { postApi } from '../../utils/api/api';
import moment from 'moment';
import { CheckoutMode } from '../../types/billing';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { setKaslKey } from '../../utils/localStorage';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { clearQueryString } from '../../utils/uri';

interface ItemInterface {
  price: {
    product: {
      name: string;
    };
    unit_amount: number;
  };
}

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleGetUser } = useUser();

  const [email, setEmail] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [datePaid, setDatePaid] = useState<number | null>(null);
  const [lastFour, setLastFour] = useState<number>(0);

  const [planName, setPlanName] = useState<string>('');
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [planType, setPlanType] = useState<string>('');

  const [items, setItems] = useState<ItemInterface[]>([]);

  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState<number>(15);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);
      if (
        typeof params['session_id'] === 'string' &&
        params['session_id'].length > 0
      ) {
        const url =
          'billing/' +
          (!params['mode'] || params['mode'] !== CheckoutMode.ONE_TIME
            ? 'create-subscription'
            : 'purchase');
        postApi({
          url,
          payload: {
            session_id: params['session_id'],
          },
        }).then(async (res) => {
          if (res.results.data) {
            const result: any = res.results.data;
            setKaslKey(result.kasl_key);
            setEmail(result.email);
            setAmountPaid(result.amount_paid);
            setDatePaid(result.date_paid * 1000);
            setLastFour(result.last_four);
            setPlanName(result.plan_name);
            setPlanPrice(result.plan_price);
            setPlanType(result.plan_type);
            setItems(result.items);
            setIsRunning(true);
            await handleGetUser();
          }
        });
      }
      clearQueryString();
    } else {
      navigate('/billing');
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/billing');
    }
  }, [countdown]);

  return (
    <div id="SuccessPage">
      <div className="success-header">
        <h1>Payment Successful</h1>
      </div>
      <div className="success-content">
        <p className="success-message">
          Thank you for your payment. Your payment has been successful. A
          confirmation email has been sent to <strong>{email}</strong>
        </p>
        <p className="success-message-2">
          Redirecting in {countdown} seconds. Please wait or click{' '}
          <a
            onClick={() => isRunning && navigate('/billing')}
            style={{
              pointerEvents: isRunning ? 'auto' : 'none',
              color: isRunning ? 'blue' : 'gray',
            }}
          >
            here
          </a>
          .{' '}
        </p>
        <div className="payment-info">
          <div>
            <span className="label">AMOUNT PAID</span>
            <span className="text">${amountPaid}</span>
          </div>
          <div>
            <span className="label">DATE PAID</span>
            <span className="text">
              {moment(datePaid).format('MMM D, YYYY')}
            </span>
          </div>
          <div>
            <span className="label">Payment Method</span>
            <span className="text">
              <img
                src="https://s3.amazonaws.com/uat-app.productfeedback.co/assets/success/filled-card-master.svg"
                alt=""
              />
              -{lastFour}
            </span>
          </div>
        </div>
        <div className="plan">
          <div className="name">{planName}</div>
          <div className="price">
            ${planPrice}
            <span className="type">/{planType}</span>
          </div>
          <div className="vectors">
            <img
              className="vector-3"
              src="https://s3.amazonaws.com/uat-app.productfeedback.co/assets/success/vector-3.svg"
              alt=""
            />
          </div>
        </div>
        <div className="summary">
          Summary
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                <div className="item-name">{item.price.product.name}</div>
                <div className="item-price">
                  ${item.price.unit_amount / 100}
                </div>
              </li>
            ))}
            <li>
              <div className="amount-paid">Amount Paid</div>
              <div className="amount-paid">${amountPaid}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
