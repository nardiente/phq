import moment from 'moment';
import { useFeedback } from '../../contexts/FeedbackContext';

export function IdeasSection() {
  const {
    state: { ideas, roadmaps },
  } = useFeedback();

  const mostCommentedIdeas = () => {
    return ideas
      .sort((a, b) => (b.comment_count || 0) - (a.comment_count || 0))
      .slice(0, 5)
      .map((idea) => (
        <div key={idea.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{idea.title}</div>
        </div>
      ));
  };

  const mostOldestIdeas = () => {
    return ideas
      .sort(
        (a, b) =>
          moment(b.created_at ?? moment()).unix() -
          moment(a.created_at ?? moment()).unix()
      )
      .slice(0, 5)
      .map((idea) => (
        <div key={idea.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{idea.title}</div>
        </div>
      ));
  };

  const mostShippedIdeas = () => {
    const shipped =
      roadmaps && roadmaps.length > 0
        ? roadmaps[roadmaps.length - 1]
        : undefined;
    if (shipped) {
      return ideas
        .filter((idea) => idea.status?.name === shipped.name)
        .sort((a, b) => {
          return (
            moment(b.updated_at ?? moment()).unix() -
            moment(a.updated_at ?? moment()).unix()
          );
        })
        .slice(0, 5)
        .map((idea) => (
          <div key={idea.id} className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">
              {idea.title}
            </div>
          </div>
        ));
    }
  };

  const mostVotedIdeas = () => {
    return ideas
      .sort((a, b) => (b.vote || 0) - (a.vote || 0))
      .slice(0, 5)
      .map((idea) => (
        <div key={idea.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{idea.title}</div>
        </div>
      ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Ideas</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Upvotes
          </div>
          {mostVotedIdeas()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Comments
          </div>
          {mostCommentedIdeas()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Ideas Shipped
          </div>
          {mostShippedIdeas()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Oldest Ideas
          </div>
          {mostOldestIdeas()}
        </div>
      </div>
    </div>
  );
}
