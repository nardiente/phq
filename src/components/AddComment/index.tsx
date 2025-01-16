import './styles.css';
import ReactQuill from 'react-quill';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import { getApi, postApi } from '../../utils/api/api';
import {
  getKaslKey,
  getModerateUserLogin,
  getSessionToken,
  setModerateUserLogin,
} from '../../utils/localStorage';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { ApiFieldError } from '../../utils/api/types';
import { useEffect, useState } from 'react';
import { FeedbackComment } from '../../types/feedback';
import { UserTypes } from '../../types/user';
import { Permissions, RbacPermissions } from '../../types/common';
import UpvoteCard from '../UpvoteCard';
import { UIField } from '../UIField';
import {
  validateEmail,
  validateEmailWithResponse,
  validateFullName,
  validatePassword,
  validatePasswordWithResponse,
} from '../../utils/custom-validation';
import { PrivacyPolicyField } from '../PrivacyPolicyField';
import { Comments } from '../Comments';

const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

const mentionSource = async (searchTerm: any, renderList: any) => {
  postApi({
    url: 'users/search',
    payload: {
      name: searchTerm,
      is_public: import.meta.env.VITE_SYSTEM_TYPE === 'public',
    },
    useSessionToken: is_public && getModerateUserLogin() === true,
  }).then((res) => {
    if (res.results.data) {
      const data: any = res.results.data;

      const mentioned: number[] = [];
      const comment_form = document.getElementById('comment-form');
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

const AddComment = () => {
  const { user } = useUser();
  const {
    state: { comment_id, mentioned_users, panel_loading },
    addMentionedUser,
    setActivePage,
    setMentionedUser,
    setPanelCommentId,
    setPanelLoading,
    setSuccessType,
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
      user?.moderation?.user_login === true);

  const [comments, setComments] = useState<FeedbackComment[]>([]);

  const [is_member, setIsMember] = useState<boolean>(false);
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [comment, setComment] = useState<string>('');
  const [internal, setInternal] = useState<boolean>(false);
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm_password, setConfirmPassword] = useState<string>('');
  const [password_match, setPasswordMatch] = useState<boolean>(false);
  const [agreed_privacy_policy, setAgreedPrivacyPolicy] = useState<
    boolean | undefined
  >(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingComment, setFetchingComment] = useState<boolean>(false);

  const [isCommentFocused, setIsCommentFocused] = useState(false);

  const [mentioned_user_ids, setMentionedUserIds] = useState<number[]>([]);

  const [enable_button, setEnableButton] = useState<boolean>(false);

  const handleGetComments = () => {
    setFetchingComment(true);
    setPanelLoading(true);
    getApi<FeedbackComment[]>({
      url: `feedback/${idea?.id ?? 0}/comment`,
      params: {
        direction: 'desc',
      },
      useSessionToken: is_public && user?.moderation?.user_login === true,
    })
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          if (is_public) {
            setComments(
              data.filter(
                (comment) =>
                  (comment.hidden && comment.has_reply && !comment.deleted) ||
                  (comment.deleted && comment.has_reply) ||
                  (!comment.deleted && !comment.hidden)
              )
            );
          } else {
            setComments(
              data.filter(
                (comment) =>
                  !comment.deleted || (comment.deleted && comment.has_reply)
              )
            );
          }
          data.forEach((datum) => {
            datum.mentioned_users.forEach((mentioned_user) => {
              addMentionedUser(mentioned_user);
            });
          });
          setFetchingComment(false);
          setPanelLoading(false);
        }
      })
      .catch(() => {
        setFetchingComment(false);
        setPanelLoading(false);
      });
  };

  const handleAddComment = () => {
    setLoading(true);
    setPanelCommentId();

    let cleaned_comment = comment.trim().replace('<p><br></p>', '');
    do {
      cleaned_comment = cleaned_comment.replace('<p><br></p>', '');
    } while (cleaned_comment.includes('<p><br></p>'));

    do {
      cleaned_comment = cleaned_comment.replace('\t', '');
    } while (cleaned_comment.includes('\t'));

    postApi({
      url: `feedback/${idea?.id ?? 0}/comment`,
      payload: {
        comment: cleaned_comment,
        internal,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        agreed_privacy_policy,
        domain: window.location.host,
        type: is_public ? UserTypes.USER : UserTypes.CUSTOMER,
        mentioning: mentioned_user_ids.length > 0,
        mentioned: mentioned_user_ids,
        token:
          user?.moderation?.user_login === false
            ? getSessionToken()
            : undefined,
      },
      useSessionToken: is_public && user?.moderation?.user_login === true,
    }).then((res) => {
      setLoading(false);
      if (res.results.errors) {
        setApiFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        if (is_logged_in) {
          setInternal(false);
          setComment(''); // clear the text field
          handleGetComments();
          if (idea) {
            updateIdea({
              ...idea,
              comment_count: (idea.comment_count ?? 0) + 1,
            });
            updateIdeaInRoadmap(idea.status_id ?? 0, {
              ...idea,
              comment_count: (idea.comment_count ?? 0) + 1,
            });
          }
        } else {
          setSuccessType('comment');
          setActivePage('success');
        }
        socket?.send(
          JSON.stringify({
            action: 'updateTag',
            created_by: idea?.customer_id ?? 0,
          })
        );
      }
    });
  };

  useEffect(() => {
    setMentionedUser([]);
    handleGetComments();
    if (user?.user?.role_id) {
      setIsMember(true);
    }
  }, []);

  useEffect(() => {
    // convert HTML text to plain text
    const trimmed_comment = comment.replace(/<[^>]+>/g, '').trim();

    setEnableButton(
      (trimmed_comment.length > 0 &&
        !loading &&
        user?.permissions.includes(Permissions.ADD_COMMENT) &&
        ((!is_public && !idea?.not_administer) || is_public)) ??
        false
    );

    setModerateUserLogin((user?.moderation?.user_login === true).toString());
  }, [comment, loading, user, is_public, idea]);

  useEffect(() => {
    if (!panel_loading) {
      if (mentioned_users.length > 0) {
        const ql_editors = document.querySelectorAll(
          '[class="ql-editor"]'
        ) as NodeListOf<HTMLDivElement>;
        ql_editors.forEach((ql_editor) => {
          const elements = ql_editor.getElementsByClassName(
            'mention'
          ) as HTMLCollectionOf<HTMLSpanElement>;
          for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const data_id = element.getAttribute('data-id');
            const full_name = mentioned_users.find(
              (mentioned_user) => mentioned_user.id === Number(data_id)
            )?.full_name;
            if (full_name !== undefined) {
              const span = element.querySelector(
                '[contenteditable="false"]'
              ) as HTMLSpanElement;
              if (span) {
                // Create a temporary element to copy the text content without styles
                const tempElement = document.createElement('div');
                tempElement.textContent = `@${full_name}`;

                // Copy the plain text content to the clipboard
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(tempElement);
                selection?.removeAllRanges();
                selection?.addRange(range);
                document.execCommand('copy');
                selection?.removeAllRanges();
              }
            }
          }
        });
      }

      if (comment_id) {
        const element = document.getElementById(`comment-${comment_id}`);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [comment_id, mentioned_users, panel_loading]);

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
    <div id="AddComment">
      {idea && <UpvoteCard props={idea} />}
      <hr />
      {is_logged_in && (
        <form
          id="comment-form"
          className={isCommentFocused ? 'form-active' : ''}
        >
          <div onPaste={(event) => onPaste(event)}>
            <ReactQuill
              theme="snow"
              className="quill-wrapper word-break"
              modules={modules}
              placeholder="Write your comment here..."
              tabIndex={4}
              value={comment}
              onFocus={() =>
                user?.permissions.includes(Permissions.ADD_COMMENT) &&
                setIsCommentFocused(true)
              }
              onBlur={() => setIsCommentFocused(false)}
              onChange={(data) => {
                setComment(data);
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
                !user?.permissions.includes(Permissions.ADD_COMMENT) &&
                is_member &&
                !user?.rbac_permissions.includes(
                  RbacPermissions.CREATE_EDIT_HIDE_DELETE_OWN_PUBLIC_AND_INTERNAL_COMMENTS
                )
              }
            />
          </div>
          {/* )} */}
          <div className="comment-form-bottom">
            <button
              id="AddCommentButton"
              onClick={handleAddComment}
              disabled={!enable_button}
              type="button"
            >
              {loading ? 'Loading ...' : 'Add comment'}
            </button>
            {!is_public && (
              <div className="internal-switch flex items-center gap-4">
                <input
                  id="internalComment"
                  type="checkbox"
                  name="internalComment"
                  className="switch is-rounded is-small"
                  checked={internal}
                  onChange={() => setInternal((prev) => !prev)}
                  disabled={
                    !user?.permissions.includes(Permissions.ADD_COMMENT) ||
                    idea?.not_administer
                  }
                />
                <label className="switch-label" htmlFor="internalComment">
                  Post comment internally
                </label>
              </div>
            )}
          </div>
        </form>
      )}
      {!is_logged_in && (
        <>
          <UIField
            id="CommentField"
            onChangeArea={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            type="textarea"
            value={comment}
            readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
          />
          <span style={{ color: '#888399', fontFamily: 'Satoshi-Variable' }}>
            To join the conversation, please share with us a little bit about
            yourself!
          </span>
          <div id="YourDetails">
            <span>Your details</span>
            <div className="rows">
              <UIField
                container_class="width-49"
                id="FirstNameField"
                placeholder="First name"
                type="text"
                error_label={
                  api_field_errors.find(
                    (field_error) => field_error.field === 'first_name'
                  )?.message
                }
                is_error_state={api_field_errors.some(
                  (field_error) => field_error.field === 'first_name'
                )}
                max_length={100}
                onBlur={(e) => {
                  let error;
                  const validationResult = validateFullName(e.target.value);
                  if (validationResult != null) {
                    error = {
                      field: 'first_name',
                      message: validationResult,
                    };
                  }
                  if (error) {
                    let copy_field_errors = api_field_errors.filter(
                      (field_error) => field_error.field !== 'first_name'
                    );
                    if (copy_field_errors.length > 0)
                      copy_field_errors.push(error);
                    else copy_field_errors = [error];
                    setApiFieldErrors(copy_field_errors);
                  }
                }}
                onChange={(e) => {
                  setApiFieldErrors(
                    api_field_errors.filter(
                      (field_error) => field_error.field !== 'first_name'
                    )
                  );
                  setFirstName(e.target.value);
                }}
                value={first_name}
                readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
              />
              <UIField
                container_class="width-49"
                id="LastNameField"
                placeholder="Last name"
                type="text"
                error_label={
                  api_field_errors.find(
                    (field_error) => field_error.field === 'last_name'
                  )?.message
                }
                is_error_state={api_field_errors.some(
                  (field_error) => field_error.field === 'last_name'
                )}
                max_length={100}
                onBlur={(e) => {
                  let error;
                  const validationResult = validateFullName(e.target.value);
                  if (validationResult != null) {
                    error = {
                      field: 'last_name',
                      message: validationResult,
                    };
                  }
                  if (error) {
                    let copy_field_errors = api_field_errors.filter(
                      (field_error) => field_error.field !== 'last_name'
                    );
                    if (copy_field_errors.length > 0)
                      copy_field_errors.push(error);
                    else copy_field_errors = [error];
                    setApiFieldErrors(copy_field_errors);
                  }
                }}
                onChange={(e) => {
                  setApiFieldErrors(
                    api_field_errors.filter(
                      (field_error) => field_error.field !== 'last_name'
                    )
                  );
                  setLastName(e.target.value);
                }}
                value={last_name}
                readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
              />
              <UIField
                container_class="width-49"
                id="EmailField"
                placeholder="Email"
                type="email"
                error_label={
                  api_field_errors.find(
                    (field_error) => field_error.field === 'email'
                  )?.message
                }
                is_error_state={api_field_errors.some(
                  (field_error) => field_error.field === 'email'
                )}
                max_length={256}
                onBlur={(e) => {
                  let error;
                  const validationResult = validateEmailWithResponse(
                    e.target.value
                  );
                  if (validationResult != null) {
                    error = {
                      field: 'email',
                      message: validationResult,
                    };
                  }
                  if (error) {
                    let copy_field_errors = api_field_errors.filter(
                      (field_error) => field_error.field !== 'email'
                    );
                    if (copy_field_errors.length > 0)
                      copy_field_errors.push(error);
                    else copy_field_errors = [error];
                    setApiFieldErrors(copy_field_errors);
                  }
                }}
                onChange={(e) => {
                  setApiFieldErrors(
                    api_field_errors.filter(
                      (field_error) => field_error.field !== 'email'
                    )
                  );
                  setEmail(e.target.value);
                }}
                value={email}
                readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
              />
            </div>
            <span>Set a password</span>
            <UIField
              container_class="margin-bottom-0"
              error_label={api_field_errors
                .find((field_error) => field_error.field === 'password')
                ?.message.replace(
                  'error.password.weak',
                  'error.password.complexity'
                )
                .replace('error.password.invalid', 'error.password.complexity')
                .replace('error.password.length', 'error.password.complexity')}
              has_eye_icon={true}
              has_icon={password_match}
              id="PasswordField"
              is_error_state={api_field_errors.some(
                (field_error) => field_error.field === 'password'
              )}
              is_success_state={password_match}
              max_length={256}
              onBlur={(e) => {
                let error;
                const validationResult = validatePasswordWithResponse(
                  e.target.value
                );
                if (validationResult != null) {
                  error = {
                    field: 'password',
                    message: validationResult,
                  };
                }
                if (error) {
                  let copy_field_errors = api_field_errors.filter(
                    (field_error) => field_error.field !== 'password'
                  );
                  if (copy_field_errors.length > 0)
                    copy_field_errors.push(error);
                  else copy_field_errors = [error];
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              onChange={(e) => {
                setApiFieldErrors(
                  api_field_errors.filter(
                    (field_error) =>
                      field_error.field !== 'password' &&
                      field_error.field !== 'confirm_password'
                  )
                );
                setPasswordMatch(false);
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
              required={true}
              type="password"
              value={password}
              readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
            />
            <UIField
              error_label={api_field_errors
                .find((field_error) => field_error.field === 'confirm_password')
                ?.message.replace(
                  'error.confirm_password.invalid',
                  'error.password.complexity'
                )
                .replace(
                  'error.confirm_password.length',
                  'error.password.complexity'
                )}
              has_eye_icon={true}
              has_icon={password_match}
              id="ConfirmPasswordField"
              is_error_state={api_field_errors.some(
                (field_error) => field_error.field === 'confirm_password'
              )}
              is_success_state={password_match}
              max_length={256}
              onBlur={(e) => {
                let error;
                if (e.target.value.length === 0) {
                  error = {
                    field: 'confirm_password',
                    message: 'This is a required field.',
                  };
                }
                if (
                  password !== confirm_password &&
                  e.target.value.length > 0
                ) {
                  error = {
                    field: 'confirm_password',
                    message: 'The passwords do not match. Please try again.',
                  };
                }
                if (
                  !api_field_errors.some(
                    (field_error) => field_error.field === 'password'
                  ) &&
                  e.target.value.length > 0 &&
                  password === e.target.value
                ) {
                  setPasswordMatch(true);
                }
                if (error) {
                  let copy_field_errors = api_field_errors.filter(
                    (field_error) => field_error.field !== 'confirm_password'
                  );
                  if (copy_field_errors.length > 0)
                    copy_field_errors.push(error);
                  else copy_field_errors = [error];
                  setApiFieldErrors(copy_field_errors);
                }
              }}
              onChange={(e) => {
                setApiFieldErrors(
                  api_field_errors.filter(
                    (field_error) => field_error.field !== 'confirm_password'
                  )
                );
                setPasswordMatch(false);
                setConfirmPassword(e.target.value);
                if (
                  !api_field_errors.some(
                    (field_error) => field_error.field === 'password'
                  ) &&
                  e.target.value.length > 0 &&
                  password === e.target.value
                ) {
                  setPasswordMatch(true);
                }
              }}
              placeholder="Confirm password"
              required={true}
              success_label="Matched!"
              type="password"
              value={confirm_password}
              readOnly={!user?.permissions.includes(Permissions.ADD_COMMENT)}
            />
          </div>
          <PrivacyPolicyField
            agreed_privacy_policy={agreed_privacy_policy}
            setAgreedPrivacyPolicy={setAgreedPrivacyPolicy}
          />
          <div className="add-comment-button">
            <button
              disabled={
                comment.trim().length == 0 ||
                validateFullName(first_name) != null ||
                validateFullName(last_name) != null ||
                validateEmail(email) != null ||
                validatePassword(password) != null ||
                !password_match ||
                !agreed_privacy_policy ||
                loading ||
                !user?.permissions.includes(Permissions.ADD_COMMENT)
              }
              onClick={handleAddComment}
              type="button"
            >
              {loading ? 'Loading ...' : 'Add comment'}
            </button>
          </div>
        </>
      )}

      <Comments
        comments={comments}
        fetchingComment={fetchingComment}
        handleGetComments={handleGetComments}
      />
    </div>
  );
};

export default AddComment;
