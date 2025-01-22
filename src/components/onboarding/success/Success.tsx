import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { setKaslKey } from '../../../utils/localStorage';
import { postApi } from '../../../utils/api/api';

export const Success = () => {
  const navigate = useNavigate();

  const { handleGetUser } = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    postApi({
      url: 'users/onboarding/survey',
      payload: {
        token: localStorage.getItem('onboarding_token') ?? '',
      },
    });
  }, []);

  const onContinue = async () => {
    setLoading(true);
    postApi({
      url: 'users/onboarding/success',
      payload: {
        token: localStorage.getItem('onboarding_token') ?? '',
      },
    })
      .then(async () => {
        setKaslKey(localStorage.getItem('onboarding_token') ?? '');
        localStorage.removeItem('onboarding_page');
        localStorage.removeItem('onboarding_token');
        await handleGetUser();
        navigate('/dashboard');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div id="successOnboarding">
      <img id="logo" src="./static/images/logo.svg" />
      <p>Congrats! You&apos;re set to go!</p>
      <div className="gif-container">
        <img src="./static/gifs/success.webp" />
        <div className="next-steps">
          <p>Next steps</p>
          <ul>
            <li>Invite your team</li>
            <li>Customise your board</li>
            <li>Add your board to your site</li>
            <li>Tell your customers about your board</li>
          </ul>
          <button
            type="button"
            onClick={async () => await onContinue()}
            disabled={loading}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
