import moment, { Moment } from 'moment';
import { Feedback, FeedbackComment, UpvoteLog } from '../types/feedback';

const end = moment().endOf('day');

export const listComments = ({
  feedbackComments,
  start,
}: {
  feedbackComments: FeedbackComment[];
  start?: Moment;
}) => {
  return feedbackComments
    .filter((comment) => {
      const created_at = moment(comment.created_at);
      return (
        ((start && created_at.isBetween(start, end, undefined, '[]')) ||
          (!start && created_at.isSameOrBefore(end))) &&
        !comment.deleted &&
        (!comment.admin_approval_status ||
          comment.admin_approval_status === 'approved')
      );
    })
    .sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
};

export const listIdeas = ({
  filteredIdeas,
  sort,
  start,
}: {
  filteredIdeas: Feedback[];
  sort?: 'Newest' | 'Trending' | 'Oldest' | 'Most Comments' | 'Most Votes';
  start?: Moment;
}) => {
  const ideas = filteredIdeas.filter((idea) => {
    const created_at = moment(idea.created_at);
    return start
      ? created_at.isBetween(start, end, undefined, '[]')
      : created_at.isSameOrBefore(end);
  });
  if (sort === 'Trending') {
    return ideas.sort((a, b) => b.vote - a.vote);
  }
  return ideas.sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
};

export const listUpvotes = ({
  upvoteLogs,
  filteredIdeas,
  start,
}: {
  upvoteLogs: UpvoteLog[];
  filteredIdeas: Feedback[];
  start?: Moment;
}) => {
  const feedbacks = upvoteLogs.filter((upvote) => {
    const created_at = moment(upvote.created_at);
    return start
      ? created_at.isBetween(start, end, undefined, '[]')
      : created_at.isSameOrBefore(end);
  });

  return filteredIdeas
    .filter(
      (idea) =>
        idea.id &&
        feedbacks.map((feedback) => feedback.feedback_id).includes(idea.id)
    )
    .sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
};
