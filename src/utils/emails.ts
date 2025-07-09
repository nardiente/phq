import moment, { Moment } from 'moment';
import { Feedback, FeedbackComment, UpvoteLog } from '../types/feedback';

const end = moment().endOf('day');

export const listComments = ({
  feedbackComments,
  start,
  filters,
}: {
  feedbackComments: FeedbackComment[];
  start?: Moment;
  filters?: Partial<Record<keyof FeedbackComment, any>>;
}) => {
  let comments = feedbackComments.filter((comment) => {
    const created_at = moment(comment.created_at);
    return (
      ((start && created_at.isBetween(start, end, undefined, '[]')) ||
        (!start && created_at.isSameOrBefore(end))) &&
      !comment.deleted &&
      (!comment.admin_approval_status ||
        comment.admin_approval_status === 'approved')
    );
  });

  if (filters) {
    comments = comments.filter(
      (comment) =>
        filters.anonymous_id?.includes(comment.anonymous_id) ||
        filters.created_by?.includes(comment.created_by)
    );

    delete filters.anonymous_id;
    delete filters.created_by;

    comments = comments.filter((comment) =>
      Object.entries(filters).every(
        ([key, value]) => comment?.[key as keyof typeof comment] === value
      )
    );
  }

  return comments.sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
};

export const listIdeas = ({
  filteredIdeas,
  sort,
  start,
  filters,
}: {
  filteredIdeas: Feedback[];
  sort?: 'Newest' | 'Trending' | 'Oldest' | 'Most Comments' | 'Most Votes';
  start?: Moment;
  filters?: Partial<Record<keyof Feedback, any>>;
}) => {
  let ideas = filteredIdeas.filter((idea) => {
    const created_at = moment(idea.created_at);
    return start
      ? created_at.isBetween(start, end, undefined, '[]')
      : created_at.isSameOrBefore(end);
  });

  if (filters) {
    ideas = ideas.filter(
      (idea) =>
        filters.anonymous_id?.includes(idea.anonymous_id) ||
        filters.created_by?.includes(idea.created_by)
    );

    delete filters.anonymous_id;
    delete filters.created_by;

    ideas = ideas.filter((idea) =>
      Object.entries(filters).every(
        ([key, value]) => idea?.[key as keyof typeof idea] === value
      )
    );
  }

  ideas = ideas.sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
  if (sort === 'Trending') {
    ideas = ideas.sort((a, b) => b.vote - a.vote);
  }

  return ideas;
};

export const listUpvoteLogs = ({
  upvotes,
  start,
  filters,
}: {
  upvotes: UpvoteLog[];
  start?: Moment;
  filters?: Partial<Record<keyof UpvoteLog, any>>;
}) => {
  let upvoteLogs = upvotes.filter((upvote) => {
    const created_at = moment(upvote.created_at);
    return start
      ? created_at.isBetween(start, end, undefined, '[]')
      : created_at.isSameOrBefore(end);
  });

  if (filters) {
    upvoteLogs = upvoteLogs.filter(
      (upvote) =>
        filters.anonymous_id?.includes(upvote.anonymous_id) ||
        filters.user_id?.includes(upvote.user_id)
    );

    upvoteLogs = upvoteLogs.filter((upvoteLog) =>
      Object.entries(filters).every(
        ([key, value]) => upvoteLog?.[key as keyof typeof upvoteLog] === value
      )
    );
  }

  return upvoteLogs;
};

export const listUpvotes = ({
  upvoteLogs,
  filteredIdeas,
  start,
  filters,
}: {
  upvoteLogs: UpvoteLog[];
  filteredIdeas: Feedback[];
  start?: Moment;
  filters?: Partial<Record<keyof Feedback, any>>;
}) => {
  const upvotes = upvoteLogs.filter((upvote) => {
    const created_at = moment(upvote.created_at);
    return start
      ? created_at.isBetween(start, end, undefined, '[]')
      : created_at.isSameOrBefore(end);
  });

  let ideas = filteredIdeas.filter(
    (idea) =>
      idea.id && upvotes.map((upvote) => upvote.feedback_id).includes(idea.id)
  );

  if (filters) {
    ideas = ideas.filter(
      (idea) =>
        filters.anonymous_id?.includes(idea.anonymous_id) ||
        filters.created_by?.includes(idea.created_by)
    );

    delete filters.anonymous_id;
    delete filters.created_by;

    ideas = ideas.filter((idea) =>
      Object.entries(filters).every(
        ([key, value]) => idea?.[key as keyof typeof idea] === value
      )
    );
  }

  return ideas.sort((a, b) => (a.id && b.id ? a.id - b.id : 0));
};
