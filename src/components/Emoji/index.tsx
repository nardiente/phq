import { useEffect, useState } from 'react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useUser } from '../../contexts/UserContext';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import './styles.css';
import { Feedback } from '../../types/feedback';
import { EmojiTypes, Permissions } from '../../types/common';
import { useApp } from '../../contexts/AppContext';

const Emoji = ({
  addEmoji,
  is_draft,
}: {
  addEmoji: (type: any) => Promise<void>;
  is_draft: any;
}) => {
  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { ideas, selectedIdea },
  } = useFeedback();

  const [idea, setIdea] = useState<Feedback>();
  const [showOption, setShowOption] = useState<boolean>(false);

  const is_logged_in =
    getKaslKey() !== undefined ||
    (getSessionToken() !== undefined &&
      is_public &&
      user?.moderation?.allow_anonymous_access === true &&
      user.user?.id);

  useEffect(() => {
    let idea = ideas?.find((idea) => idea.id === selectedIdea?.id);
    if (!idea) {
      idea = selectedIdea ?? undefined;
    }
    setIdea(idea);
  }, [ideas, selectedIdea]);

  const toggleOption = () => {
    setShowOption((prev) => !prev);
  };

  return (
    <div className="emoji-container">
      {showOption && (
        <div className="emoji-options">
          <div>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.LIKE);
              }}
            >
              👍
            </button>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.HEART);
              }}
            >
              😍
            </button>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.KISS);
              }}
            >
              😘
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.FIRE);
              }}
            >
              🔥
            </button>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.EYES);
              }}
            >
              👀
            </button>
            <button
              onClick={() => {
                toggleOption();
                addEmoji(EmojiTypes.SAD);
              }}
            >
              😢
            </button>
          </div>
        </div>
      )}
      <button
        className="emoji-button"
        disabled={
          is_draft ||
          !is_logged_in ||
          !user?.permissions.includes(Permissions.ADD_EMOJI) ||
          (!is_public && idea?.not_administer)
        }
        onClick={toggleOption}
      >
        <img
          src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-smile.svg"
          alt="Emoji"
        />
      </button>
    </div>
  );
};

export default Emoji;
