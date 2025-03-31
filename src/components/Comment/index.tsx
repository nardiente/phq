import './styles.css';
import moment from 'moment';
import { FeedbackComment } from '../Comments/types';
import ReactQuill from 'react-quill';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import { getApi, patchApi, postApi } from '../../utils/api/api';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import { Fragment, useEffect, useRef } from 'react';
import { useState } from 'react';
import { UserTypes } from '../../types/user';
import { RbacPermissions } from '../../types/common';
import { Permissions } from '../../types/common';
import { PROFILE_PLACEHOLDER } from '../../constants/placeholders';
import { PinFillIcon } from '../icons/pin-fill.icon';
import { EyeSlashIcon } from '../icons/eye-slash.icon';
import { EyeIcon } from '../icons/eye.icon';
import { TrashIcon } from '../icons/trash.icon';
import Emoji from '../Emoji';
import EmojiList from '../EmojiList';

const mentionSource = async (searchTerm: any, renderList: any) => {
  postApi({
    url: 'users/search',
    payload: {
      name: searchTerm,
      is_public: import.meta.env.VITE_SYSTEM_TYPE === 'public',
    },
  }).then((res) => {
    if (res.results.data) {
      const data: any = res.results.data;

      const mentioned: number[] = [];
      const comment_form = document.getElementById('ReplyForm');
      if (comment_form) {
        const elements = comment_form.getElementsByClassName(
          'mention'
        ) as HTMLCollectionOf<HTMLSpanElement>;
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          const data_id = element.getAttribute('data-id');
          if (
            data_id &&
            !mentioned.some((mention) => mention == Number(data_id))
          ) {
            mentioned.push(Number(data_id));
          }
        }
      }

      renderList(
        data.user_list
          .filter((user: any) => !mentioned.includes(user.id))
          .map((user: any) => {
            return {
              id: user.id,
              value: user.value,
            };
          }),
        searchTerm
      );
    }
  });
};

const modules = {
  toolbar: false,
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@'],
    source: mentionSource,
    positioningStrategy: 'fixed',
  },
};

export const Comment = ({
  comment,
  deleteComment,
  parentComment,
  handleGetComments,
}: {
  comment: FeedbackComment;
  deleteComment: (feedback_id: number, comment_id: number) => void;
  parentComment?: FeedbackComment;
  handleGetComments: () => void;
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const { user } = useUser();
  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const {
    state: { commentIdToDelete },
    addMentionedUser,
    setPanelCommentId,
    setPanelCommentIdToDelete,
    setPanelLoading,
  } = usePanel();
  const {
    state: { ideas, selectedIdea },
    updateIdea,
    updateIdeaInRoadmap,
  } = useFeedback();
  const {
    state: { socket },
  } = useSocket();
  let idea = ideas?.find((idea) => idea.id === selectedIdea?.id);
  if (!idea) {
    idea = selectedIdea ?? undefined;
  }

  const is_logged_in =
    getKaslKey() !== undefined ||
    (getSessionToken() !== undefined &&
      is_public &&
      user?.moderation?.user_login === true &&
      user.user?.id);
  const is_draft = comment.draft;
  const [currentComment, setCurrentComment] = useState(comment);
  const [lineHeight, setLightHeight] = useState(0);

  const [showReply, setShowReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<FeedbackComment[]>([]);
  const [reply, setReply] = useState<string>('');
  const [internal, setInternal] = useState<boolean>(
    comment.internal ? comment.internal : false
  );
  const [loading, setLoading] = useState<boolean>(false);

  const replyButtonRef = useRef<HTMLButtonElement>(null);
  const replyFormRef = useRef<HTMLFormElement>(null);

  const [is_admin, setIsAdmin] = useState<boolean>(false);
  const [is_member, setIsMember] = useState<boolean>(false);

  const [isReplyFocused, setIsReplyFocused] = useState(false);

  const [mentioned_user_ids, setMentionedUserIds] = useState<number[]>([]);

  const [enable_reply_button, setEnableReplyButton] = useState<boolean>(false);

  if (!isReplyFocused || !showReply) {
    const mention_containers = document.querySelectorAll(
      '[class^="ql-mention-list-container"]'
    ) as NodeListOf<HTMLDivElement>;
    mention_containers.forEach((element) => {
      element.style.visibility = 'hidden';
    });
  }

  const convertDate = (date: Date | undefined) => {
    const currentDate = moment(date);
    const diffInMinutes = moment().diff(currentDate, 'minutes');
    if (diffInMinutes < 1) {
      return 'about a minute ago';
    } else if (diffInMinutes < 10) {
      return 'about 10 minutes ago';
    } else {
      return currentDate.format('MMM D, YYYY');
    }
  };

  const addEmoji = async (type: any) => {
    const { emoji_list, my_emoji } = currentComment;
    const newEmojiList = emoji_list;
    const newMyEmoji = my_emoji;

    if (my_emoji.includes(type)) {
      // Decrease
      newEmojiList[type] -= 1;
      newMyEmoji.splice(newMyEmoji.indexOf(type), 1);
    } else {
      // Increase
      newEmojiList[type] += 1;
      newMyEmoji.push(type);
    }

    const oldComment = currentComment;

    setCurrentComment({
      ...currentComment,
      emoji_list: newEmojiList,
      my_emoji: newMyEmoji,
    });

    await postApi({
      url: `feedback/${comment.feedback_id}/comment/${comment.id}/emoji`,
      payload: { type },
      useSessionToken: is_public && user?.moderation?.user_login === true,
    }).then((res) => {
      if (res.results.errors) {
        setCurrentComment(oldComment);
      }
    });
  };

  const toggleVisibility = async () => {
    const oldComment = currentComment;

    setCurrentComment({
      ...currentComment,
      hidden: !currentComment.hidden,
    });

    await postApi({
      url: `feedback/${comment.feedback_id}/comment/${comment.id}/visibility`,
      useSessionToken: is_public && user?.moderation?.user_login === true,
    }).then((res) => {
      if (res.results.errors) {
        setCurrentComment(oldComment);
      }
    });
  };

  const handleGetReplies = () => {
    setPanelLoading(true);
    getApi<FeedbackComment[]>({
      url: `feedback/${comment.feedback_id}/comment`,
      params: {
        parent_id: comment.id.toString(),
        direction: 'desc',
      },
      useSessionToken: is_public && user?.moderation?.user_login === true,
    })
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          setReplies(data);
          data.forEach((datum) => {
            datum.mentioned_users.forEach((mentioned_user) => {
              addMentionedUser(mentioned_user);
            });
          });
        }
        setPanelLoading(false);
      })
      .catch(() => setPanelLoading(false));
  };

  const handleOnAddReply = () => {
    setLoading(true);
    setPanelCommentId();

    let cleaned_comment = reply.trim().replace('<p><br></p>', '');
    do {
      cleaned_comment = cleaned_comment.replace('<p><br></p>', '');
    } while (cleaned_comment.includes('<p><br></p>'));

    do {
      cleaned_comment = cleaned_comment.replace('\t', '');
    } while (cleaned_comment.includes('\t'));

    postApi({
      url: `feedback/${comment.feedback_id}/comment`,
      payload: {
        comment: cleaned_comment,
        internal,
        parent_id: comment.id,
        domain: window.location.host,
        type: UserTypes.USER,
        mentioning: mentioned_user_ids.length > 0,
        mentioned: mentioned_user_ids,
      },
      useSessionToken: is_public && user?.moderation?.user_login === true,
    }).then((res) => {
      setLoading(false);
      if (res.results.data) {
        setInternal(false);
        setReply('');
        setShowReply(false);
        const newReply: any = res.results.data;
        setReplies([newReply, ...replies]);
        if (idea) {
          updateIdea({
            ...idea,
            comment_count: (idea.comment_count ?? 0) + 1,
          });
          updateIdeaInRoadmap(idea.status_id ?? 0, {
            ...idea,
            comment_count: (idea.comment_count ?? 0) + 1,
          });
          socket?.emit('message', {
            action: 'updateIdea',
            data: { user_id: user?.user?.id, projectId: user?.project?.id },
          });
        }
        socket?.emit('message', {
          action: 'updateTag',
          data: {
            created_by: idea?.customer_id || 0,
            projectId: user?.project?.id,
          },
        });
      }
    });
  };

  const handlePin = () => {
    setLoading(true);
    patchApi(`feedback/${comment.feedback_id}/comment/${comment.id}/pin`).then(
      () => {
        setLoading(false);
        handleGetComments();
      }
    );
  };

  const toggleForm = () => {
    setShowReply((prev) => !prev);
    if (reply.length == 0) {
      const full_name = currentComment.author.full_name;
      setReply(
        `<span class="mention" data-index="0" data-denotation-char="@" data-id="${currentComment.author.id}" data-value="${full_name}"><span contenteditable="false"><span class="ql-mention-denotation-char">@</span>${full_name}</span></span>`
      );
    }
  };

  useEffect(() => {
    if (user?.user?.type === UserTypes.CUSTOMER && user.user?.role_id) {
      setIsMember(true);
    }

    if (import.meta.env.VITE_SYSTEM_TYPE === 'admin') {
      setIsAdmin(true);
    }

    if (comment.has_reply) {
      handleGetReplies();
    }

    const right = document.getElementById(
      `right-${comment.id}`
    ) as HTMLDivElement;
    setLightHeight(right.offsetHeight - 26);

    const handleClickOutside = (event: any) => {
      if (replyButtonRef.current && replyButtonRef.current === event.target) {
        toggleForm();
        return;
      }
      if (
        replyFormRef.current &&
        !replyFormRef.current.contains(event.target) &&
        !event.target.classList.contains('panel-container')
      ) {
        setShowReply(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const trimmed_reply = reply.replace(/<[^>]+>/g, '').trim();

    setEnableReplyButton(
      (trimmed_reply.length > 0 &&
        !loading &&
        user?.permissions.includes(Permissions.ADD_REPLY) &&
        ((is_admin &&
          !idea?.not_administer &&
          ((is_member &&
            user.rbac_permissions.includes(
              RbacPermissions.CREATE_EDIT_HIDE_DELETE_OWN_PUBLIC_AND_INTERNAL_COMMENTS
            )) ||
            (is_admin && !is_member))) ||
          is_public)) ??
        false
    );
  }, [reply, loading, user, is_admin, is_public, idea]);

  function onPaste(event: any) {
    const brRegex = /\r?\n/g;
    const paste = (event.clipboardData || window.Clipboard).getData(
      'text/plain'
    );
    const divText = paste.split(brRegex);

    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return false;
    }

    const div = document.createElement('div');
    divText.forEach((text: any) => {
      div.appendChild(document.createTextNode(text));
      div.appendChild(document.createElement('br'));
    });

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(div);

    event.preventDefault();
  }

  return (
    <div
      id={`comment-${currentComment.id}`}
      className="CommentContainer"
      style={is_draft ? { opacity: '50%' } : {}}
    >
      <div className="details">
        <div className="left">
          {(is_admin || !currentComment.hidden) && !currentComment.deleted && (
            <Fragment>
              <div
                className={
                  !parentComment
                    ? (is_admin || !currentComment.hidden) &&
                      !currentComment.deleted
                      ? 'avatar'
                      : 'avatar placeholder'
                    : parentComment && parentComment.parent_id === 0
                      ? 'avatar blue'
                      : 'avatar purple'
                }
              >
                {(is_admin || !currentComment.hidden) &&
                !currentComment.deleted ? (
                  currentComment.author.profile_photo &&
                  !currentComment.author.profile_photo.includes(
                    'placeholder'
                  ) ? (
                    <img src={currentComment.author.profile_photo} />
                  ) : (
                    currentComment.author.full_name.charAt(0).toUpperCase()
                  )
                ) : (
                  <img src={PROFILE_PLACEHOLDER} />
                )}
              </div>
              <div className="line" style={{ height: `${lineHeight}px` }}></div>
            </Fragment>
          )}
        </div>
        <div id={`right-${comment.id}`} className="right">
          {(is_admin || !currentComment.hidden) && !currentComment.deleted && (
            <div className="comment-header">
              <div
                className={
                  currentComment.hidden || currentComment.deleted
                    ? 'creator-name hidden'
                    : 'creator-name'
                }
              >
                {is_draft && <label className="draft">{'(Draft)'}</label>}
                {(is_admin || !currentComment.hidden) &&
                !currentComment.deleted ? (
                  <Fragment>
                    {currentComment.author.full_name.substring(0, 20).trim()}
                    {currentComment.author.full_name.length > 20 ? '...' : ''}
                  </Fragment>
                ) : (
                  ''
                )}
                {currentComment.author.is_admin && (
                  <div className="admin-badge">Admin</div>
                )}
              </div>
              {!currentComment.deleted && (
                <div className="toolbar-container">
                  {currentComment.hidden && (
                    <div className="hidden-tag">Hidden</div>
                  )}
                  {((is_member &&
                    ((currentComment.author.id == user?.user?.id &&
                      user.rbac_permissions.includes(
                        RbacPermissions.CREATE_EDIT_HIDE_DELETE_OWN_PUBLIC_AND_INTERNAL_COMMENTS
                      )) ||
                      (currentComment.author.id != user?.user?.id &&
                        user?.rbac_permissions.includes(
                          RbacPermissions.HIDE_DELETE_OTHERS_COMMENT
                        )))) ||
                    (is_admin && !is_member) ||
                    is_public) && (
                    <div className="toolbar">
                      {(is_admin || (is_public && currentComment.pinned)) &&
                        currentComment.parent_id === 0 && (
                          <button
                            className={`${
                              currentComment.pinned ? 'pinned' : ''
                            } ${is_public ? 'cursor-default' : ''}`}
                            onClick={() => (is_admin ? handlePin() : {})}
                            disabled={loading}
                          >
                            <PinFillIcon />
                          </button>
                        )}
                      {is_admin && (
                        <>
                          <button
                            onClick={toggleVisibility}
                            disabled={
                              !user?.permissions.includes(
                                Permissions.HIDE_COMMENT
                              ) || idea?.not_administer
                            }
                          >
                            {currentComment.hidden ? (
                              <EyeSlashIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setPanelCommentIdToDelete(comment.id)
                            }
                            disabled={
                              !user?.permissions.includes(
                                Permissions.DELETE_COMMENT
                              ) || idea?.not_administer
                            }
                          >
                            <TrashIcon />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div
            className={
              currentComment.hidden || currentComment.deleted
                ? 'comment hidden-comment'
                : 'comment'
            }
          >
            <pre>
              {(is_admin || !currentComment.hidden) &&
                !currentComment.deleted && (
                  <ReactQuill
                    ref={quillRef}
                    className="quill-wrapper word-break"
                    modules={modules}
                    theme="snow"
                    value={currentComment.comment}
                    readOnly={true}
                  />
                )}
              {!is_admin &&
                currentComment.hidden &&
                currentComment.has_reply &&
                !currentComment.deleted &&
                'This comment has been hidden.'}
              {currentComment.deleted && 'This comment has been deleted.'}
            </pre>
          </div>
          {!is_admin &&
          currentComment.hidden &&
          !currentComment.has_reply &&
          !currentComment.deleted ? null : (
            <Fragment>
              <div className="more-details">
                <Emoji
                  addEmoji={addEmoji}
                  is_draft={is_draft || currentComment.deleted}
                />
                <div className="line">
                  <span></span>
                </div>
                <div
                  className={`internal${
                    currentComment.internal ? ' color' : ''
                  }`}
                >
                  {currentComment.internal ? 'Internal' : 'Public'}
                </div>
                {(is_admin || (!is_admin && !user?.project?.hide_datetime)) && (
                  <>
                    <div className="line">
                      <span></span>
                    </div>
                    <div className="time">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                      {convertDate(comment.created_at)}
                    </div>
                  </>
                )}

                {!parentComment && (
                  <>
                    <div className="line">
                      <span></span>
                    </div>
                    <button
                      ref={replyButtonRef}
                      className="reply-button"
                      disabled={
                        is_draft ||
                        currentComment.deleted ||
                        !is_logged_in ||
                        !user?.permissions.includes(Permissions.ADD_REPLY) ||
                        (is_admin && idea?.not_administer)
                      }
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-reply"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                      </svg>
                      Reply
                    </button>
                  </>
                )}
                {parentComment && parentComment.parent_id === 0 && (
                  <>
                    <div className="line">
                      <span></span>
                    </div>
                    <button
                      ref={replyButtonRef}
                      className="reply-button"
                      disabled={
                        is_draft ||
                        !is_logged_in ||
                        !user?.permissions.includes(Permissions.ADD_REPLY) ||
                        (is_admin && idea?.not_administer)
                      }
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-reply"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                      </svg>
                      Reply
                    </button>
                  </>
                )}
              </div>
              <EmojiList comment={currentComment} addEmoji={addEmoji} />
            </Fragment>
          )}
        </div>
      </div>
      {is_logged_in && showReply && (
        <form
          onPaste={(event) => onPaste(event)}
          id="ReplyForm"
          ref={replyFormRef}
          className={isReplyFocused ? 'form-active' : ''}
        >
          {/* {is_public ? (
            <textarea
              name=""
              id="CommentField"
              cols={3}
              placeholder="Write your reply here..."
              value={reply}
              onFocus={() => setIsReplyFocused(true)}
              onBlur={() => setIsReplyFocused(false)}
              onChange={(e) => setReply(e.target.value)}
              readOnly={!user.permissions.includes(Permissions.ADD_REPLY)}
            ></textarea>
          ) : ( */}
          <ReactQuill
            ref={quillRef}
            theme="snow"
            className="quill-wrapper word-break"
            modules={modules}
            placeholder="Write your reply here..."
            tabIndex={4}
            value={reply}
            onFocus={() =>
              user?.permissions.includes(Permissions.ADD_REPLY) &&
              setIsReplyFocused(true)
            }
            onBlur={() => setIsReplyFocused(false)}
            onChange={(data) => {
              setReply(data);
              const parser = new DOMParser();
              const doc = parser.parseFromString(data, 'text/html');
              const elements = doc.getElementsByClassName(
                'mention'
              ) as HTMLCollectionOf<HTMLSpanElement>;
              const mentioned: number[] = [];
              for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                const data_id = element.getAttribute('data-id');
                if (
                  data_id &&
                  !mentioned.some((mention) => mention == Number(data_id))
                ) {
                  mentioned.push(Number(data_id));
                }
              }
              setMentionedUserIds(mentioned);
            }}
            readOnly={
              !user?.permissions.includes(Permissions.ADD_REPLY) ||
              idea?.not_administer
            }
          />
          {/* )} */}
          <div className="reply-form-bottom">
            <button
              id="AddReplyButton"
              onClick={handleOnAddReply}
              disabled={!enable_reply_button}
              type="button"
            >
              {loading ? 'Loading ...' : 'Reply'}
            </button>
            {!is_public && !comment.internal && (
              <div className="internal-switch flex items-center gap-4">
                <input
                  id="internalReply"
                  type="checkbox"
                  name="internalReply"
                  className="switch is-rounded is-small"
                  checked={internal}
                  onChange={() => setInternal((prev) => !prev)}
                  disabled={
                    !user?.permissions.includes(Permissions.ADD_REPLY) ||
                    idea?.not_administer
                  }
                />
                <label className="switch-label" htmlFor="internalReply">
                  Post reply internally
                </label>
              </div>
            )}
          </div>
        </form>
      )}
      {replies.length > 0 && (
        <div id="Replies">
          {replies.map((reply) => (
            <Fragment key={reply.id}>
              {reply.id !== commentIdToDelete ? (
                <Comment
                  comment={reply}
                  deleteComment={deleteComment}
                  parentComment={comment}
                  handleGetComments={handleGetComments}
                />
              ) : (
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
                      className={`${!loading ? 'is-clickable ' : ''}cancel-btn`}
                      onClick={() => setPanelCommentIdToDelete(0)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${!loading ? 'is-clickable ' : ''}d-btn`}
                      disabled={loading}
                      onClick={() => deleteComment(reply.feedback_id, reply.id)}
                      type="button"
                    >
                      {loading ? 'Loading...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
