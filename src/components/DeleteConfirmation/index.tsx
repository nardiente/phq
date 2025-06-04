import { useState } from 'react';
import './styles.css';
import { toast } from 'react-toastify';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useUser } from '../../contexts/UserContext';
import { deleteApi, putApi } from '../../utils/api/api';
import { Feedback } from '../../types/feedback';
import { RbacPermissions } from '../../types/common';
import { Publications } from '../../types/whats-new';
import { useWhatsNew } from '../../contexts/WhatsNewContext';
import { Roadmap } from '../../types/roadmap';
import { useSocket } from '../../contexts/SocketContext';
import { SocketAction } from '../../types/socket';

const DeleteConfirmation = () => {
  const {
    state: { deleteType, deleteId },
    setActivePage,
    setIsOpen,
  } = usePanel();
  const {
    state: { posts },
    deletePostById,
    updatePost,
  } = useWhatsNew();
  const post = posts?.find((post) => post.id === deleteId);
  const {
    state: { filter },
    deleteIdeaById,
    deleteIdeaInRoadmapById,
    setRoadmaps,
  } = useFeedback();
  const { handleGetUser, user } = useUser();
  const {
    state: { socket },
  } = useSocket();

  const [loading, setLoading] = useState<boolean>(false);
  const [draftLoading, setDraftLoading] = useState<boolean>(false);

  const handleFilterRoadmaps = (data: Roadmap[]) => {
    if (!filter.title && !filter.tags.length) {
      return data;
    }

    const filterTitleLower = filter.title.toLowerCase();
    const filterTagLower = filter.tags.map((tag) => tag.toLowerCase());

    const filteredRoadmaps = data.map((roadmap: Roadmap) => {
      const filteredUpvotes =
        roadmap.upvotes?.filter((upvote: Feedback) => {
          const titleMatch =
            !filterTitleLower ||
            upvote.title?.toLowerCase().includes(filterTitleLower);

          const tagMatch =
            !filterTagLower.length ||
            upvote.feedback_tags?.some((feedbackTag) => {
              const tag = feedbackTag.tag;
              return tag && filterTagLower.includes(tag.tag.toLowerCase());
            });

          return titleMatch && tagMatch;
        }) || [];

      return { ...roadmap, upvotes: filteredUpvotes };
    });

    return filteredRoadmaps;
  };

  const handleOnCancel = () => {
    if (deleteType == 'idea') {
      setActivePage('add_comment');
      return;
    }
    if (deleteType == 'column') {
      setIsOpen(false);
    }
    if (deleteType == 'post') {
      setIsOpen(false);
    }
  };

  const handleOnDraft = () => {
    setDraftLoading(true);
    putApi(`whatsnew/${deleteId}/publication`, {
      publication: Publications.DRAFT,
    }).then((res) => {
      if (res.results.data) {
        updatePost(res.results.data);
        setIsOpen(false);
      }
    });
  };

  const handleOnDelete = () => {
    setLoading(true);
    if (deleteType == 'idea') {
      deleteApi<Feedback>({ url: `feedback/${deleteId}` }).then(async (res) => {
        const {
          results: { data },
        } = res;
        if (data) {
          await handleGetUser();
          deleteIdeaById(deleteId);
          deleteIdeaInRoadmapById(data.status_id ?? 0, deleteId);
          setIsOpen(false);
          socket?.emit('message', {
            action: SocketAction.DELETE_IDEA,
            data: {
              idea: data,
              user_id: user?.user?.id,
              projectId: user?.project?.id,
            },
          });
        }
      });
      return;
    }
    if (deleteType == 'column') {
      deleteApi({ url: `roadmaps/${deleteId}` }).then((res) => {
        setRoadmaps(handleFilterRoadmaps(res.results.data));
        setIsOpen(false);
        socket?.emit('message', {
          action: SocketAction.DELETE_ROADMAP,
          data: {
            roadmap: handleFilterRoadmaps(res.results.data),
            user_id: user?.user?.id,
            projectId: user?.project?.id,
          },
        });
      });
    }
    if (deleteType == 'post') {
      deleteApi({ url: `whatsnew/${deleteId}` }).then((res) => {
        if (res.results.data) {
          deletePostById(deleteId);
          setIsOpen(false);
          toast('Post successfully deleted', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            bodyClassName: 'p-2',
            className: 'custom-theme',
          });
        }
      });
    }
  };

  return (
    <div id="delete-container">
      <img
        className="icon"
        src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/shocked.png"
      />
      <h1 className="delete-title">
        {deleteType == 'idea' && 'Delete idea?'}
        {deleteType == 'column' && 'Delete column?'}
        {deleteType == 'post' && 'Delete post?'}
      </h1>
      <p className="delete-body" style={{ textAlign: 'center' }}>
        {deleteType == 'idea' && (
          <>
            Are you certain you want to delete this idea?
            <br />
            This cannot be reversed.
          </>
        )}
        {deleteType == 'column' && (
          <>
            Once deleted, all ideas in this column will move
            <br />
            to the far left column in the roadmap.
            <br />
            Are you certain you want to delete this column?
            <br />
            This cannot be reversed.
          </>
        )}
        {deleteType == 'post' && (
          <>
            Are you sure you want to delete this post?
            <br />
            It might be a good idea to save it as a draft just in case, as this
            action cannot be undone.
          </>
        )}
      </p>
      <div className="buttons">
        <button
          className={`${
            !loading && !draftLoading
              ? 'is-clickable cancel-button'
              : 'cancel-button'
          }`}
          onClick={handleOnCancel}
          disabled={loading || draftLoading}
        >
          Cancel
        </button>
        {deleteType == 'post' &&
          post != null &&
          post.publication != 'Draft' &&
          user?.rbac_permissions.includes(
            RbacPermissions.MOVE_ANY_POST_FROM_PUBLISHED_TO_DRAFT
          ) && (
            <button
              className={`${
                !loading && !draftLoading
                  ? 'is-clickable draft-button'
                  : 'draft-button'
              }`}
              onClick={handleOnDraft}
              disabled={loading || draftLoading}
            >
              {draftLoading ? 'Loading...' : 'Convert to draft'}
            </button>
          )}
        <button
          className={`${
            !loading && !draftLoading
              ? 'is-clickable delete-button'
              : 'delete-button'
          }`}
          onClick={handleOnDelete}
          disabled={loading || draftLoading}
        >
          {loading
            ? 'Loading...'
            : (deleteType == 'idea' && 'Delete idea') ||
              (deleteType == 'column' && 'Delete column') ||
              (deleteType == 'post' && 'Delete post')}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
