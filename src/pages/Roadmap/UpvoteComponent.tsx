import { Calendar4RangeIcon } from '../../components/icons/calendar4-range.icon';
import StatusBadge from '../../components/StatusBadge';
import { UpVoteCounter } from '../../components/UpVoteCounter';
import { useApp } from '../../contexts/AppContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { usePanel } from '../../contexts/PanelContext';
import { Feedback, FeedbackTag } from '../../types/feedback';
import { formatDate } from '../../utils/date';
import ArchivedBadge from '../Upvotes/components/ArchivedBadge';

export const UpvoteComponent = ({ upvote }: { upvote: Feedback }) => {
  const { is_public } = useApp();
  const { setSelectedIdea } = useFeedback();
  const { setActivePage, setIsOpen } = usePanel();

  const handleClickIdea = (feedback: Feedback) => {
    setSelectedIdea(feedback);
    setActivePage('add_comment');
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      {upvote.is_archived && <ArchivedBadge className="rounded-t-lg" />}
      <div
        className={`flex flex-col gap-2 bg-white ${upvote.is_archived ? 'rounded-b-lg pt-2' : 'rounded-lg'}`}
        style={{
          border: '1px solid #f9f9fa',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          padding: '16px',
        }}
      >
        {upvote.cover_photo && (
          <img className="h-[200px] rounded-md" src={upvote.cover_photo} />
        )}
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
                  <div
                    key={idx}
                    className={`upvote-tag ${is_public ? 'tags-color' : ''}`}
                  >
                    {feedback_tag.tag?.tag.substring(0, 10).trim()}
                    {feedback_tag.tag?.tag && feedback_tag.tag?.tag.length > 10
                      ? '...'
                      : ''}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {(upvote.estimated_release_date ||
          upvote.score ||
          upvote.status?.name) && (
          <>
            <hr />
            <div className="release-date-container flex justify-between h-[18px]">
              <div className="content">
                <Calendar4RangeIcon size={10} />
                Est Date:{' '}
                {upvote.estimated_release_date
                  ? formatDate(new Date(upvote.estimated_release_date))
                  : ''}
              </div>
              <div className="content">Score: {upvote.score ?? 0}</div>
              <div className="content">
                <StatusBadge status={upvote.status?.name.toString() ?? ''} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
