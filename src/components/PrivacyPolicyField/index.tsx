import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { CheckIcon } from '../icons/check.icon';
import './styles.css';
import { useApp } from '../../contexts/AppContext';

export const PrivacyPolicyField = ({
  agreed_privacy_policy,
  setAgreedPrivacyPolicy,
}: {
  agreed_privacy_policy: boolean | undefined;
  setAgreedPrivacyPolicy: Dispatch<SetStateAction<boolean | undefined>>;
}) => {
  const { is_public } = useApp();

  return (
    <div className="privacy-policy">
      <div className="checkbox">
        <input
          checked={agreed_privacy_policy}
          onChange={() => setAgreedPrivacyPolicy(!agreed_privacy_policy)}
          type="checkbox"
        />
        <span onClick={() => setAgreedPrivacyPolicy(!agreed_privacy_policy)}>
          <CheckIcon />
        </span>
      </div>
      <label>
        I agree to let my information be kept and used as the{' '}
        <a
          className={is_public ? 'active-link-color' : 'text-active-link'}
          href="https://producthq.io/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{' '}
        says.
      </label>
    </div>
  );
};
