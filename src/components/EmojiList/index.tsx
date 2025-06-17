import './styles.css';
import { FeedbackComment } from '../Comments/types';
import { WhatsNew } from '../../types/whats-new';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import { useUser } from '../../contexts/UserContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useEffect, useState } from 'react';
import { EmojiTypes, Permissions } from '../../types/common';
import { Feedback } from '../../types/feedback';
import { useApp } from '../../contexts/AppContext';

interface EmojiListProps {
  comment: FeedbackComment | WhatsNew;
  addEmoji: (emoji: any) => void;
}

const EmojiList: React.FC<EmojiListProps> = ({ comment, addEmoji }) => {
  const { deleted, emoji_list, my_emoji } = comment as FeedbackComment;

  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { ideas, selectedIdea },
  } = useFeedback();

  const [idea, setIdea] = useState<Feedback>();

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

  const getEmoji = (type: string) => {
    switch (type) {
      case EmojiTypes.LIKE:
        return '👍';
      case EmojiTypes.HEART:
        return '😍';
      case EmojiTypes.KISS:
        return '😘';
      case EmojiTypes.FIRE:
        return '🔥';
      case EmojiTypes.EYES:
        return '👀';
      case EmojiTypes.SAD:
        return '😢';
      default:
        return '';
    }
  };

  return (
    <div className="emoji-container">
      <div className="emoji-list">
        {emoji_list &&
          Object.entries(emoji_list).map(([type, count]) => {
            const isActive = my_emoji && my_emoji.includes(type);
            return (
              count > 0 && (
                <button
                  key={type}
                  className={`${isActive ? 'active' : ''}${
                    is_logged_in && !deleted ? ' is-clickable' : ''
                  }`}
                  disabled={
                    !is_logged_in ||
                    deleted ||
                    !user?.permissions.includes(Permissions.ADD_EMOJI) ||
                    (!is_public && idea?.not_administer)
                  }
                  onClick={() => addEmoji(type)}
                >
                  {getEmoji(type)} {count}
                </button>
              )
            );
          })}
      </div>
    </div>
  );
};

export default EmojiList;
