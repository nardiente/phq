import './styles.css';
import { FadeLoader } from 'react-spinners';
import { FeedbackComment } from './types';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { Fragment, memo, useState } from 'react';
import { deleteApi } from '../../utils/api/api';
import { PinFillIcon } from '../icons/pin-fill.icon';
import { Comment } from '../Comment';
import { useUser } from '../../contexts/UserContext';
import { SocketAction } from '../../types/socket';

export const Comments = memo(function Comments({
  comments,
  fetchingComment,
  handleGetComments,
}: {
  comments: FeedbackComment[];
  fetchingComment: boolean;
  handleGetComments: () => void;
}) {
  const {
    state: { commentIdToDelete },
    setPanelCommentIdToDelete,
  } = usePanel();
  const {
    state: { ideas, selectedIdea },
    updateIdea,
  } = useFeedback();
  const {
    state: { socket },
  } = useSocket();
  const { user: userContext } = useUser();
  const { project, user } = userContext ?? {};

  let idea = ideas?.find((idea) => idea.id === selectedIdea?.id);
  if (!idea) {
    idea = selectedIdea ?? undefined;
  }

  const [loading, setLoading] = useState<boolean>(false);

  const deleteComment = (feedback_id: number, comment_id: number) => {
    setLoading(true);
    deleteApi({ url: `feedback/${feedback_id}/comment/${comment_id}` }).then(
      (res) => {
        setLoading(false);
        if (res.results.data) {
          socket?.emit('message', {
            action: SocketAction.DELETE_COMMENT,
            data: { comment: res.results.data, projectId: project?.id },
          });
          if (idea) {
            const updatedIdea = {
              ...idea,
              comment_count: (idea?.comment_count ?? 0) - 1,
            };
            updateIdea(updatedIdea);
            socket?.emit('message', {
              action: SocketAction.UPDATE_IDEA,
              data: {
                idea: updatedIdea,
                user_id: user?.id,
                projectId: project?.id,
              },
            });
          }
          setPanelCommentIdToDelete(0);
          handleGetComments();
        }
      }
    );
  };

  return (
    <>
      <hr />
      {fetchingComment && (
        <div style={{ padding: '71px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '25px',
            }}
          >
            <FadeLoader height={5} width={2} radius={2} margin={-10} />
          </div>
        </div>
      )}
      {!fetchingComment && comments.length === 0 && (
        <div className="p-[71px]">
          <div className="flex w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#888399"
              className="bi bi-chat-right"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
            </svg>
          </div>
          <div className="flex w-full justify-center">
            <span
              style={{
                color: '#888399',
                fontFamily: 'Satoshi-Variable',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Comments will live here
            </span>
          </div>
        </div>
      )}
      {!fetchingComment && comments.length > 0 && (
        <>
          {comments.find((comment) => comment.pinned) && (
            <div className="header-pinned">
              Pinned Comment
              {comments.filter((comment) => comment.pinned).length > 1
                ? 's'
                : ''}
              <PinFillIcon size={15} />
            </div>
          )}
          <div id="Comments">
            {comments.map((comment, idx) => (
              <Fragment key={idx}>
                {comment.id !== commentIdToDelete && (
                  <Comment
                    comment={comment}
                    deleteComment={deleteComment}
                    handleGetComments={handleGetComments}
                  />
                )}
                {comment.id === commentIdToDelete && (
                  <div className="DeleteComment">
                    <div className="dc-font">
                      <span>Delete comment?</span>
                    </div>
                    <div className="dcd-font">
                      <span>
                        Are you sure you wish to delete this comment? You cannot
                        undo this action.
                      </span>
                    </div>
                    <div className="delete-comment-buttons">
                      <button
                        className={`${
                          !loading ? 'is-clickable ' : ''
                        }cancel-btn`}
                        onClick={() => setPanelCommentIdToDelete(0)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${!loading ? 'is-clickable ' : ''}d-btn`}
                        disabled={loading}
                        onClick={() =>
                          deleteComment(comment.feedback_id, comment.id)
                        }
                        type="button"
                      >
                        {loading ? 'Loading...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                )}
                {comments.find((comment) => comment.pinned) &&
                  comment.pinned &&
                  comments.length - 1 > idx &&
                  !comments[idx + 1].pinned && <hr />}
              </Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
});
