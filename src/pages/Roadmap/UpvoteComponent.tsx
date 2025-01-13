import { Calendar4RangeIcon } from '../../components/icons/calendar4-range.icon';
import { UpVoteCounter } from '../../components/UpVoteCounter';
import { useFeedback } from '../../contexts/FeedbackContext';
import { usePanel } from '../../contexts/PanelContext';
import { Feedback, FeedbackTag } from '../../types/feedback';
import { formatDate } from '../../utils/date';

export const UpvoteComponent = ({ upvote }: { upvote: Feedback }) => {
  const { setSelectedIdea } = useFeedback();
  const { setActivePage, setIsOpen } = usePanel();

  const handleClickIdea = (feedback: Feedback) => {
    setSelectedIdea(feedback);
    setActivePage('add_comment');
    setIsOpen(true);
  };

  return (
    <div className="idea-card">
      <UpVoteCounter data={upvote} hideArrow={true} />
      <div className="upvote-details">
        <div
          className="is-clickable idea-h"
          onClick={() => handleClickIdea(upvote)}
        >
          {upvote.title}
        </div>
        <div className="upvote-tags">
          {(upvote.feedback_tags || ([] as FeedbackTag[]))?.map(
            (feedback_tag, idx) => (
              <div key={idx} className="upvote-tag">
                {feedback_tag.tag?.tag.substring(0, 10).trim()}
                {feedback_tag.tag?.tag && feedback_tag.tag?.tag.length > 10
                  ? '...'
                  : ''}
              </div>
            )
          )}
        </div>
        {upvote.estimated_release_date && (
          <>
            <hr />
            <div className="release-date-container">
              <div className="content">
                <Calendar4RangeIcon size={10} />
                Estimated Date:{' '}
                {formatDate(new Date(upvote.estimated_release_date))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
