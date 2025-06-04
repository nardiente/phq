import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Feedback } from '../../types/feedback';
import './styles.css';
import styled from 'styled-components';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import { Permissions, RbacPermissions } from '../../types/common';
import { deleteApi, postApi } from '../../utils/api/api';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { SocketAction } from '../../types/socket';

const UpvoteBoxDiv = styled.button`
  align-items: center;
  border: 1px solid #e1e0e5;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 51px;
  justify-content: center;
  padding: 6px 0px;
  width: 48px;
`;

export const UpVoteCounter = ({
  data,
  hideArrow,
}: {
  data: Feedback;
  hideArrow?: boolean;
}) => {
  const idea = data;

  const { user } = useUser();
  const { moderation, permissions } = user ?? {};
  const { setSelectedIdea, updateIdea, updateIdeaInRoadmap } = useFeedback();
  const {
    state: { socket },
  } = useSocket();

  const [active_uv_arrow, setActiveUVArrow] = useState('');
  const [loading, setLoading] = useState(false);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const is_logged_in =
    getKaslKey() !== undefined ||
    (is_public &&
      moderation?.allow_anonymous_access === true &&
      getSessionToken() !== undefined &&
      user?.user?.id);
  const is_member = !!user?.user?.role_id;

  const can_upvote =
    is_logged_in &&
    !loading &&
    permissions?.includes(Permissions.EDIT_IDEA) &&
    !idea.not_administer &&
    ((is_member &&
      user.rbac_permissions.includes(
        RbacPermissions.VOTE_ON_YOUR_OWN_BEHALF
      )) ||
      !is_member);

  const handleOnClickUpvote = async () => {
    setLoading(true);

    let updated_idea = idea;

    if (idea.did_vote) {
      // downvote
      updated_idea = { ...idea, vote: idea.vote - 1, did_vote: false };
      updateIdea(updated_idea);
      updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
      setSelectedIdea(updated_idea);

      deleteApi<Feedback>({
        url: `feedback/${idea.id}/upvote`,
        useSessionToken:
          is_public && user?.moderation?.allow_anonymous_access === true,
      })
        .then((res) => {
          if (res.results.error) {
            updated_idea = { ...idea, vote: idea.vote + 1, did_vote: true };
            updateIdea(updated_idea);
            updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
            setSelectedIdea(updated_idea);
          }
        })
        .catch(() => {
          updated_idea = { ...idea, vote: idea.vote + 1, did_vote: true };
          updateIdea(updated_idea);
          updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
          setSelectedIdea(updated_idea);
        });
    } else {
      // upvote
      let updated_idea = { ...idea, vote: idea.vote + 1, did_vote: true };
      updateIdea(updated_idea);
      updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
      setSelectedIdea(updated_idea);

      await postApi({
        url: `feedback/${idea.id}/upvote`,
        useSessionToken:
          is_public && user?.moderation?.allow_anonymous_access === true,
      })
        .then((res) => {
          if (res.results.error) {
            updated_idea = { ...idea, vote: idea.vote - 1, did_vote: false };
            updateIdea(updated_idea);
            updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
            setSelectedIdea(updated_idea);
          }
        })
        .catch(() => {
          updated_idea = { ...idea, vote: idea.vote - 1, did_vote: false };
          updateIdea(updated_idea);
          updateIdeaInRoadmap(updated_idea.status_id ?? 0, updated_idea);
          setSelectedIdea(updated_idea);
        });
    }

    socket?.emit('message', {
      action: SocketAction.UPDATE_IDEA,
      data: {
        idea: updated_idea,
        user_id: user?.user?.id,
        projectId: user?.project?.id,
      },
    });

    setLoading(false);
  };

  return (
    <UpvoteBoxDiv
      className={`${can_upvote ? 'upvote-a is-clickable' : 'cursor-default'}`}
      onClick={() => can_upvote && handleOnClickUpvote()}
      type="button"
      onMouseDown={() => {
        if (can_upvote) {
          setActiveUVArrow('upvote-arrow');
        }
      }}
      onMouseUp={() => {
        if (can_upvote) {
          setActiveUVArrow('');
        }
      }}
    >
      {!hideArrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className={`${active_uv_arrow} bi bi-caret-up-fill`}
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      )}
      <span className="upvote-count">{idea?.vote}</span>
    </UpvoteBoxDiv>
  );
};

export default UpVoteCounter;
