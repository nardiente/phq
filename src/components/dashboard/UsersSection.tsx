import { useEffect, useState } from 'react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useUser } from '../../contexts/UserContext';
import { getApi } from '../../utils/api/api';
import {
  TeamActivity,
  TeamActivityAction,
  TeamActivityType,
} from '../../types/team-activities';
import { removeHtmlTags } from '../../utils/string';

export function UsersSection() {
  const {
    state: { comments, ideas, upvotes },
  } = useFeedback();
  const { users } = useUser();
  const [teamActivitiesList, setTeamActivitiesList] = useState<
    JSX.Element[] | null
  >(null);

  useEffect(() => {
    const fetchTeamActivities = async () => {
      const activities = await teamActivities();
      setTeamActivitiesList(activities);
    };
    if (ideas.length > 0 && users.length > 0) {
      fetchTeamActivities();
    }
  }, [ideas, users]);

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

  const teamActivities = async () => {
    const res = await getApi<TeamActivity[]>({
      url: 'team-activities',
      params: { limit: '5' },
    });
    const {
      results: { data },
    } = res;
    if (data) {
      return data.map((teamActivity) => {
        const creator = users.find(
          (user) => user.id === teamActivity.created_by
        );
        let activity = <></>;
        let subject = '';
        switch (teamActivity.type) {
          case TeamActivityType.COMMENT:
            switch (teamActivity.action) {
              case TeamActivityAction.COMMENTED:
                subject =
                  ideas.find((idea) => idea.id === teamActivity.subject)
                    ?.title ?? '';
                activity = (
                  <div>
                    {`${creator?.full_name ?? creator?.first_name + ' ' + creator?.last_name} ${teamActivity.action}`}{' '}
                    {' idea '}
                    <b>
                      <i>{subject}</i>
                    </b>
                    .
                  </div>
                );
                break;
              case TeamActivityAction.DELETED:
                subject = removeHtmlTags(
                  comments.find(
                    (comment) => comment.id === teamActivity.subject
                  )?.comment ?? ''
                );
                activity = (
                  <div>
                    {`${creator?.full_name ?? `${creator?.first_name} ${creator?.last_name}`} ${teamActivity.action} comment `}
                    <b>
                      <i>{subject}</i>
                    </b>
                    .
                  </div>
                );
                break;
              case TeamActivityAction.REPLIED:
                subject = removeHtmlTags(
                  comments.find(
                    (comment) => comment.id === teamActivity.subject
                  )?.comment ?? ''
                );
                activity = (
                  <div>
                    {`${creator?.full_name ?? creator?.first_name + ' ' + creator?.last_name} ${teamActivity.action}`}
                    {' on comment '}
                    <b>
                      <i>{subject}</i>
                    </b>
                    .
                  </div>
                );
                break;
              default:
                break;
            }
            break;
          case TeamActivityType.IDEA:
            subject =
              ideas.find((idea) => idea.id === teamActivity.subject)?.title ??
              '';
            activity = (
              <div>
                {`${creator?.full_name ?? creator?.first_name + ' ' + creator?.last_name} ${teamActivity.action}`}{' '}
                {teamActivity.type}{' '}
                <b>
                  <i>{subject}</i>
                </b>
                .
              </div>
            );
            break;
          default:
            break;
        }
        return (
          <div
            key={teamActivity.id}
            className="flex items-center justify-between mb-1"
          >
            <div className="flex gap-2 text-sm font-medium text-gray-500">
              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="flex items-center justify-center text-purple-600 text-sm w-5">
                  <figure
                    className={`image items-center justify-center${
                      creator?.profile_photo &&
                      creator?.profile_photo.length > 0 &&
                      creator?.profile_photo !=
                        '../../../static/assets/profile-placeholder.svg'
                        ? ''
                        : ' avatar'
                    }`}
                  >
                    {creator?.profile_photo &&
                    creator?.profile_photo.length > 0 &&
                    creator?.profile_photo !=
                      '../../../static/assets/profile-placeholder.svg' ? (
                      <img
                        className="rounded-full"
                        src={creator?.profile_photo}
                      />
                    ) : (
                      creator?.full_name?.toUpperCase().charAt(0)
                    )}
                  </figure>
                </span>
              </div>
              {activity}
            </div>
          </div>
        );
      });
    }
    return null;
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
          <div className="text-base font-medium text-gray-700 mb-2">
            Team Member Activity
          </div>
          {teamActivitiesList}
        </div>
      </div>
    </>
  );
}
