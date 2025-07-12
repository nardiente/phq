import './styles.css';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import { ApiFieldError } from '../../utils/api/types';
import { Feedback, Tag } from '../../types/feedback';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { Option } from '../../types/dropdown';
import { postApi, putApi } from '../../utils/api/api';
import { UserTypes } from '../../types/user';
import { toast } from 'react-toastify';
import { RbacPermissions } from '../../types/common';
import { UIField } from '../UIField';
import {
  validateEmailWithResponse,
  validateFullName,
  validatePasswordWithResponse,
} from '../../utils/custom-validation';
import { CustomDropdown } from '../ui/dropdown/dropdown_search';
import { UpvoteAdminStatus } from '../UpvoteAdminStatus';
import { Calendar } from '../Calendar';
import { PrivacyPolicyField } from '../PrivacyPolicyField';
import { useSocket } from '../../contexts/SocketContext';
import { SocketAction } from '../../types/socket';
import { useApp } from '../../contexts/AppContext';
import { isTeamMember } from '../../utils/user';

export const SubmitIdea = () => {
  const { is_public } = useApp();
  const { handleGetUser, user: userDetails } = useUser();
  const { moderation, project, user } = userDetails ?? {};
  // Active Page: add_idea, add_comment, success, delete_idea, delete_column
  const {
    state: { activePage },
    setIsOpen,
    setPanelLoading,
    setActivePage,
  } = usePanel();
  const {
    state: { ideas, selectedIdea, tags, filter },
    addIdea,
    updateIdea,
    setSelectedIdea,
  } = useFeedback();
  const {
    state: { socket },
  } = useSocket();

  const is_logged_in =
    getKaslKey() !== undefined ||
    (getSessionToken() !== undefined &&
      is_public &&
      moderation?.allow_anonymous_access === true &&
      user?.id);

  const [active_status, setActiveStatus] = useState<string>('Select status');
  const [agreed_privacy_policy, setAgreedPrivacyPolicy] = useState<
    boolean | undefined
  >(false);
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [confirm_password, setConfirmPassword] = useState<string | undefined>(
    ''
  );
  const [description, setDescription] = useState('');
  const [disabled_button, setDisabledButton] = useState<boolean>(true);
  const [email, setEmail] = useState<string | undefined>('');
  const [estimated_release_date, setEstimatedReleaseDate] = useState<
    Date | undefined
  >();
  const [title, setTitle] = useState('');
  const [first_name, setFirstName] = useState<string | undefined>('');
  const [last_name, setLastName] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [password_match, setPasswordMatch] = useState<boolean | undefined>(
    false
  );
  const [selected_tags, setSelectedTags] = useState<(Tag | undefined)[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [is_admin, setIsAdmin] = useState(false);
  const [is_member, setIsMember] = useState(false);

  const [idea, setIdea] = useState<Feedback | undefined>(
    selectedIdea ?? undefined
  );

  // vote on behalf of
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option>();

  useEffect(() => {
    if (idea && activePage == 'edit_idea') {
      setTitle(idea.title || '');
      setDescription(idea.description || '');
      setSelectedTags(
        idea.feedback_tags
          ?.filter((tags) => tags.tag !== undefined)
          .map((feedback_tag) => feedback_tag.tag) || []
      );
      setActiveStatus(idea?.status?.name || '');
      setEstimatedReleaseDate(
        idea?.estimated_release_date
          ? new Date(idea?.estimated_release_date)
          : undefined
      );
    }
  }, [idea]);

  useEffect(() => {
    if (selectedIdea && !idea) {
      const idea = ideas?.find((idea) => idea.id === selectedIdea.id);
      setIdea(idea);

      if (activePage == 'edit_idea') {
        setTitle(idea?.title || '');
        setDescription(idea?.description || '');
        setSelectedTags(
          idea?.feedback_tags?.map((feedback_tag) => feedback_tag.tag) || []
        );
        setActiveStatus(idea?.status?.name || '');
        setEstimatedReleaseDate(
          idea?.estimated_release_date
            ? new Date(idea?.estimated_release_date)
            : undefined
        );
      }
    }
  }, [selectedIdea]);

  useEffect(() => {
    if (selected_tags.length > 0) {
      setSelectedTags(
        tags.filter((tag) =>
          selected_tags.some((selected_tag) => selected_tag?.id === tag.id)
        )
      );
    }
  }, [tags]);

  const handleFilterData = (data: Feedback) => {
    if (!filter.title && filter.tags.length === 0) {
      return data;
    }

    const filterTitleLower = filter.title.toLowerCase();
    const filterTagLower = filter.tags.map((tag) => tag.toLowerCase());

    const titleMatch =
      !filterTitleLower || data.title?.toLowerCase().includes(filterTitleLower);
    const tagMatch =
      !filterTagLower.length ||
      data.feedback_tags?.some((feedbackTag) => {
        const tag = feedbackTag.tag;
        return tag && filterTagLower.includes(tag.tag.toLowerCase());
      });

    if (titleMatch && tagMatch) {
      return data;
    } else {
      return null;
    }
  };

  const handleOnSubmitIdea = () => {
    setSubmitting(true);

    const payload = {
      agreed_privacy_policy,
      confirm_password,
      description: description.replace(/<[^>]+>/g, '').trim(),
      domain: window.location.host,
      email,
      estimated_release_date: estimated_release_date?.toString(),
      first_name,
      last_name,
      password,
      status_name: is_admin ? active_status : '',
      tags: selected_tags.map((selected_tag) => selected_tag?.tag).join(','),
      title,
      type: is_admin ? UserTypes.CUSTOMER : UserTypes.USER,
    };
    if (is_logged_in) {
      delete payload.agreed_privacy_policy;
      delete payload.confirm_password;
      delete payload.email;
      delete payload.first_name;
      delete payload.last_name;
      delete payload.password;
    }
    setPanelLoading(true);
    postApi<Feedback>({
      url: 'feedback',
      payload,
      useSessionToken: !is_admin && moderation?.allow_anonymous_access === true,
    })
      .then(async (res) => {
        const {
          results: { data, errors },
        } = res;
        setSubmitting(false);
        await handleGetUser();
        if (errors) {
          setApiFieldErrors(errors);
        }
        if (data) {
          if (is_logged_in) {
            const filteredData = handleFilterData(data);
            const filteredDataInRoadmap = handleFilterData(data);

            if (filteredData && filteredDataInRoadmap) {
              addIdea(filteredData);
            }
            setSelectedIdea(data);
          }

          socket?.emit('message', {
            action: SocketAction.ADD_IDEA,
            data: { projectId: project?.id, idea: data },
          });

          setIsOpen(false);
        }
      })
      .finally(() => setPanelLoading(false));
  };

  const voteOnBehalf = async (option: Option) => {
    await postApi({
      url: `feedback/${selectedIdea?.id}/vote-on-behalf`,
      payload: {
        user_id: option.id,
      },
    }).then((res) => {
      if (res.results.error) {
        toast(res.results.error, {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          pauseOnFocusLoss: false,
          draggable: false,
          theme: 'dark',
          bodyClassName: 'p-2',
          className: 'custom-theme',
        });
        setSelectedOption(
          options.find(
            (option) => option.id === selectedIdea?.vote_on_behalf_id
          )
        );
      }
      if (res.results.data) {
        const result = res.results.data as Feedback;
        const updated_idea = {
          ...selectedIdea,
          vote: result.vote,
          vote_on_behalf: result.vote_on_behalf,
          vote_on_behalf_id: result.vote_on_behalf_id,
          index: selectedIdea?.index ?? 0,
        };
        updateIdea(updated_idea);
        setSelectedIdea(updated_idea);
        toast(
          `An upvote has been added to ${selectedIdea?.title} for ${option.value}.`,
          {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: false,
            theme: 'colored',
            bodyClassName: 'p-2',
            className: 'toast-success',
          }
        );
        socket?.emit('message', {
          action: SocketAction.UPDATE_IDEA,
          data: {
            idea: updated_idea,
            user_id: user?.id,
            projectId: project?.id,
          },
        });
      }
    });
  };

  const handleOnUpdateIdea = () => {
    setSubmitting(true);
    putApi<Feedback>(`feedback/${idea?.id}`, {
      title,
      description: description.replace(/<[^>]+>/g, '').trim(),
      estimated_release_date: estimated_release_date?.toString(),
      status_name: active_status,
      tags: selected_tags.map((selected_tag) => selected_tag?.tag).join(','),
    }).then(async (res) => {
      if (res.results.errors) {
        setApiFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        const data = res.results.data;
        updateIdea(data);
        setSelectedIdea(data);
        if (selectedOption && data.vote_on_behalf_id !== selectedOption.id) {
          await voteOnBehalf(selectedOption);
        }
        setSubmitting(false);
        setActivePage('add_comment');

        socket?.emit('message', {
          action: SocketAction.UPDATE_IDEA,
          data: { idea: data, projectId: project?.id },
        });
      }
    });
  };

  useEffect(() => {
    if (!is_public) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsMember(isTeamMember(user));
    }
  }, [user]);

  function handleManageTagsClick(event: any) {
    event.preventDefault();
    window.open(`http://${location.host}/tags`);
  }

  useEffect(() => {
    setDisabledButton(true);
    if (
      ((agreed_privacy_policy &&
        api_field_errors.length == 0 &&
        email &&
        email.length > 0 &&
        !is_logged_in &&
        title.trim().length > 0 &&
        first_name &&
        first_name.length > 0 &&
        last_name &&
        last_name.length > 0 &&
        password_match) ||
        (!is_admin && is_logged_in && title.trim().length > 0)) &&
      !submitting
    ) {
      setDisabledButton(false);
    }
    if (
      is_admin &&
      ((agreed_privacy_policy &&
        api_field_errors.length == 0 &&
        email &&
        email.length > 0 &&
        !is_logged_in &&
        active_status !== 'Select status' &&
        title.trim().length > 0 &&
        first_name &&
        first_name.length > 0 &&
        last_name &&
        last_name.length > 0 &&
        password_match) ||
        (is_admin &&
          title.trim().length > 0 &&
          active_status !== 'Select status')) &&
      !submitting
    ) {
      setDisabledButton(false);
    }
  }, [
    active_status,
    agreed_privacy_policy,
    api_field_errors,
    email,
    title,
    password_match,
    submitting,
  ]);

  return (
    <div id="SubmitIdea" className="form">
      <div className="upvote-details">
        {is_admin &&
          activePage === 'edit_idea' &&
          user?.rbac_permissions &&
          user?.rbac_permissions.includes(
            RbacPermissions.VOTE_ON_OTHERS_BEHALF
          ) && (
            <CustomDropdown
              placeholder="vote on behalf of"
              options={options}
              setOptions={setOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
        <UIField
          error_label={api_field_errors
            .find((field_error) => field_error.field === 'title')
            ?.message.replace(
              '"title" is not allowed to be empty',
              'This is a required field.'
            )}
          id="IdeaNameField"
          is_error_state={api_field_errors.some(
            (api_field_error) => api_field_error.field === 'title'
          )}
          onBlur={(e) => {
            let error;
            if (e.target.value.length == 0) {
              error = {
                field: 'title',
                message: 'This is a required field.',
              };
            }
            if (error) {
              let copy_field_errors = api_field_errors.filter(
                (field_error) => field_error.field !== 'title'
              );
              if (copy_field_errors.length > 0) copy_field_errors.push(error);
              else copy_field_errors = [error];
              setApiFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setApiFieldErrors(
              api_field_errors.filter(
                (api_field_error) => api_field_error.field != 'title'
              )
            );
            setTitle(e.target.value);
          }}
          placeholder="Summary of your idea in one sentence."
          type="text"
          value={title}
        />
        <UIField
          id="DescriptionField"
          onChangeArea={(e) => setDescription(e.target.value)}
          placeholder="Explain in simple terms how your idea will help you, who it is for, and how it works."
          type="textarea"
          value={description}
        />
        <div id="TagsField" className={is_admin && is_logged_in ? 'admin' : ''}>
          <div className="tag-heading-group">
            <label>Select up to 3 tags related to this idea (optional)</label>
            {((is_member &&
              user?.rbac_permissions &&
              user?.rbac_permissions.includes(
                RbacPermissions.MANAGE_TAGS_PAGE
              )) ||
              !is_member) &&
              is_admin &&
              is_logged_in && (
                <label className="manage-tags-container">
                  <Link
                    to="#"
                    className="manage-tags-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleManageTagsClick}
                  >
                    Manage Tags
                  </Link>
                </label>
              )}
          </div>
          <div className="tag-select"></div>
          <div className="tag-group">
            {tags.map((tag, idx) => {
              let sel_tag_array =
                selected_tags && selected_tags.length > 0 ? selected_tags : [];
              return (
                <span
                  className={`is-clickable ${is_public ? 'tags-color' : ''} ${
                    sel_tag_array.find(
                      (selected_tag) => selected_tag?.id === tag.id
                    )
                      ? 'active'
                      : ''
                  }`}
                  key={idx}
                  onClick={() => {
                    setApiFieldErrors(
                      api_field_errors.filter(
                        (field_error) => field_error.field !== 'tags'
                      )
                    );
                    if (
                      sel_tag_array.find(
                        (copy_selected_tag) => copy_selected_tag?.id === tag.id
                      )
                    ) {
                      sel_tag_array = sel_tag_array.filter(
                        (copy_selected_tag) => copy_selected_tag?.id !== tag.id
                      );
                    } else {
                      if (sel_tag_array.length >= 3) {
                        const error = {
                          field: 'tags',
                          message: 'Only three tags are allowed.',
                        };
                        let copy_field_errors = api_field_errors.filter(
                          (field_error) => field_error.field !== 'tags'
                        );
                        if (copy_field_errors.length > 0)
                          copy_field_errors.push(error);
                        else copy_field_errors = [error];
                        setApiFieldErrors(copy_field_errors);
                        return;
                      }
                      sel_tag_array.push(tag);
                    }
                    setSelectedTags(sel_tag_array);
                  }}
                >
                  {tag.tag}
                  <svg
                    className={`bi bi-x-circle-fill${
                      sel_tag_array.find(
                        (selected_tag) => selected_tag?.id === tag.id
                      )
                        ? ''
                        : ' is-hidden'
                    }`}
                    fill="currentColor"
                    height="10"
                    viewBox="0 0 16 16"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </span>
              );
            })}
          </div>
          <label
            className={`msg-label${
              api_field_errors.some(
                (field_error) => field_error.field === 'tags'
              )
                ? ' error'
                : tags.length === 0
                  ? ' error no-tags'
                  : ' is-hidden'
            }`}
            id="TagsFieldError"
          >
            {tags.length === 0
              ? 'No tags have been added.'
              : api_field_errors.find(
                  (field_error) => field_error.field === 'tags'
                )?.message}
          </label>
        </div>
        {is_admin && (
          <>
            <UpvoteAdminStatus
              active_status={active_status}
              setActiveStatus={setActiveStatus}
            />
            <Calendar
              label="Estimated"
              value={estimated_release_date}
              setValue={setEstimatedReleaseDate}
            />
          </>
        )}
        <hr />
        {!is_logged_in && (
          <>
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
                />
                <UIField
                  container_class="width-49"
                  id="EmailField"
                  placeholder="Email"
                  type="email"
                  error_label={api_field_errors
                    .find((field_error) => field_error.field === 'email')
                    ?.message.replace(
                      '"email" is not allowed to be empty',
                      'This is a required field.'
                    )}
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
                        field: 'first_name',
                        message: validationResult, // Ensure this is a string
                      };
                    }
                    if (error) {
                      let copy_field_errors = api_field_errors.filter(
                        (field_error) => field_error.field !== 'first_name'
                      );
                      if (copy_field_errors.length > 0) {
                        copy_field_errors.push(error as ApiFieldError);
                      } else {
                        copy_field_errors = [error];
                      }
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
                  .replace(
                    'error.password.invalid',
                    'error.password.complexity'
                  )
                  .replace(
                    'error.password.length',
                    'error.password.complexity'
                  )}
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
              />
              <UIField
                error_label={api_field_errors
                  .find(
                    (field_error) => field_error.field === 'confirm_password'
                  )
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
              />
            </div>
            <PrivacyPolicyField
              agreed_privacy_policy={agreed_privacy_policy}
              setAgreedPrivacyPolicy={setAgreedPrivacyPolicy}
            />
          </>
        )}
        <div className="submit-idea-button">
          {is_admin && activePage == 'edit_idea' ? (
            <>
              <button
                className={`cancel${!disabled_button ? ' is-clickable ' : ''}`}
                disabled={disabled_button}
                onClick={() => {
                  setSelectedIdea(idea ?? null);
                  setActivePage('add_comment');
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className={`${!disabled_button ? 'is-clickable' : ''} bg-button-orange border-gray-200 text-white`}
                disabled={disabled_button}
                onClick={handleOnUpdateIdea}
                type="button"
              >
                {submitting ? 'Loading ...' : 'Save idea'}
              </button>
            </>
          ) : (
            <button
              className={`${!disabled_button ? 'is-clickable' : ''} ${is_public ? 'primary-button-color' : 'bg-button-orange border-gray-200 text-white'}`}
              disabled={disabled_button}
              onClick={handleOnSubmitIdea}
              type="button"
            >
              {submitting ? (
                'Loading ...'
              ) : (
                <Fragment>
                  Submit Idea
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </Fragment>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
