import { usePanel } from '../../contexts/PanelContext';
import { useUser } from '../../contexts/UserContext';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import './styles.css';
import { Permissions } from '../../types/common';

const SuccessMessage = () => {
  const {
    state: { panel_loading, successType },
    setActivePage,
  } = usePanel();
  const { user } = useUser();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const is_logged_in =
    getKaslKey() !== null ||
    (getSessionToken() !== null &&
      is_public &&
      user?.moderation?.user_login === true);

  return (
    <div id="success-container">
      <img
        className="icon"
        src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/public/success_msg_icon.svg"
      />
      <h1 className="success-title">Coolio!</h1>
      {successType == 'idea' && (
        <>
          <p className="success-body">Thanks for sharing your idea with us!</p>
          {!is_logged_in && (
            <p className="success-body" style={{ textAlign: 'center' }}>
              Your idea will remain in draft format till your email is verified.
              <br />
              Kindly check your email and spam folders.
            </p>
          )}
          {is_logged_in && (
            <div className="buttons">
              <button
                className="is-clickable secondary-button"
                onClick={() => setActivePage('add_comment')}
              >
                View idea
              </button>
              <button
                className="is-clickable primary-button"
                disabled={
                  !user?.permissions.includes(Permissions.ADD_IDEA) ||
                  panel_loading
                }
                onClick={() => setActivePage('add_idea')}
              >
                Add new idea
              </button>
            </div>
          )}
        </>
      )}
      {successType == 'comment' && (
        <>
          <p className="success-body">
            Thanks for sharing your comment with us!!
          </p>
          <p className="success-body" style={{ textAlign: 'center' }}>
            Your comment will remain in draft format till your email is
            verified.
            <br />
            Kindly check your email and spam folders.
          </p>
        </>
      )}
    </div>
  );
};

export default SuccessMessage;
