import { useEffect } from 'react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useUser } from '../../contexts/UserContext';

export function UsersSection() {
  const {
    state: { comments, ideas, upvotes },
    listComments,
    listUpvotes,
  } = useFeedback();
  const { users } = useUser();

  useEffect(() => {
    listComments();
    listUpvotes();
  }, []);

  const mostComments = () => {
    const usersComments = users.map((user) => ({
      ...user,
      comments: comments.filter((comment) => comment.created_by === user.id),
    }));
    return usersComments
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 5)
      .map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            {user.full_name}
          </div>
        </div>
      ));
  };

  const mostIdeas = () => {
    const usersIdeas = users.map((user) => ({
      ...user,
      ideas: ideas.filter((idea) => idea.created_by === user.id),
    }));
    return usersIdeas
      .sort((a, b) => b.ideas.length - a.ideas.length)
      .slice(0, 5)
      .map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            {user.full_name}
          </div>
        </div>
      ));
  };

  const mostUpvotes = () => {
    const usersUpvotes = users.map((user) => ({
      ...user,
      upvotes: upvotes.filter((upvote) => upvote.user_id === user.id),
    }));
    return usersUpvotes
      .sort((a, b) => b.upvotes.length - a.upvotes.length)
      .slice(0, 5)
      .map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            {user.full_name}
          </div>
        </div>
      ));
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Upvotes
          </div>
          {mostUpvotes()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Comments
          </div>
          {mostComments()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Ideas
          </div>
          {mostIdeas()}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Team Member Activity
          </div>
          {/* {filteredCommentedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
