import moment from 'moment';
import styled from 'styled-components';
import './styles.css';
import { Feedback, FeedbackTag } from '../../types/feedback';
import { useUser } from '../../contexts/UserContext';
import { useState } from 'react';
import UpVoteCounter from '../UpVoteCounter';
import { Permissions, RbacPermissions } from '../../types/common';
import { usePanel } from '../../contexts/PanelContext';
import { TrashIcon } from '../icons/trash.icon';
import { formatDate } from '../../utils/date';
import { EyeIcon } from '../icons/eye.icon';
import { EyeSlashIcon } from '../icons/eye-slash.icon';
import { putApi } from '../../utils/api/api';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { CloudArrowUpFillIcon } from '../icons/cloud-arrow-up-fill.icon';
import { UploadPhoto } from '../UploadPhoto';
import { ImageType } from '../../types/user';
import { ArchiveFillIcon } from '../icons/archive-fill.icon';
import { ArchiveOffIcon } from '../icons/archive-off.icon';
import { toast } from 'react-toastify';
import { SocketAction } from '../../types/socket';
import { useApp } from '../../contexts/AppContext';
import { isTeamMember } from '../../utils/user';

const UpvoteLabelLink = styled.span`
  align-items: center;
  display: flex;
  font-family: 'Satoshi-Variable';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.005em;
  line-height: 24px;
  width: 77.98%;
`;

const UpvoteCard = ({ props }: { props: Feedback }) => {
  const { is_public } = useApp();
  const { setSelectedIdea, updateIdea } = useFeedback();
  const { user: userContext } = useUser();
  const { permissions, project, rbac_permissions, user } = userContext ?? {};
  const { setActivePage, setDeleteId, setDeleteType } = usePanel();
  const {
    state: { socket },
  } = useSocket();

  const is_admin = !is_public;
  const is_member = isTeamMember(user);

  const [loading, setLoading] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);

  const onArchive = () => {
    const { description, status, title } = props;
    setLoading(true);
    putApi<Feedback>(`feedback/${props.id}`, {
      description,
      is_archived: !props.is_archived,
      status: status?.name,
      title,
    }).then((res) => {
      setLoading(false);
      const { results } = res;
      const { data } = results ?? {};
      if (data) {
        setSelectedIdea(data);
        updateIdea(data);
        socket?.emit('message', {
          action: SocketAction.UPDATE_IDEA,
          data: {
            idea: data,
            user_id: user?.id,
            projectId: project?.id,
          },
        });
        toast(
          `Idea has been ${!props.is_archived ? 'archived' : 'restored'}.`,
          {
            autoClose: 3000,
            bodyClassName: 'p-2',
            className: 'toast-success',
            closeOnClick: true,
            draggable: false,
            hideProgressBar: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            theme: 'colored',
          }
        );
      }
    });
  };

  const onHideOnRoadmap = () => {
    const { description, title } = props;
    setLoading(true);
    putApi<Feedback>(`feedback/${props.id}`, {
      description,
      hide_on_roadmap: !props.hide_on_roadmap,
      status: props.status?.name,
      title,
    }).then((res) => {
      setLoading(false);
      const { results } = res;
      const { data } = results ?? {};
      if (data) {
        setSelectedIdea(data);
        updateIdea(data);
        socket?.emit('message', {
          action: SocketAction.UPDATE_IDEA,
          data: { idea: data, user_id: user?.id, projectId: project?.id },
        });
      }
    });
  };

  const onSetPhoto = (value: string) => {
    setSelectedIdea({ ...props, cover_photo: value });
    updateIdea({ ...props, cover_photo: value });
  };

  return (
    <div id="UpVoteEachList">
      <div className="upvote-counter-container">
        <UpVoteCounter data={props} />
        {is_admin && (
          <>
            <div className="line" />
            {((is_member &&
              rbac_permissions?.includes(RbacPermissions.CREATE_EDIT_IDEAS)) ||
              !is_member) && (
              <button
                className="edit-button"
                data-tooltip-content="Edit"
                disabled={
                  !permissions?.includes(Permissions.EDIT_IDEA) ||
                  props.not_administer ||
                  loading
                }
                onClick={() => setActivePage('edit_idea')}
                role="button"
                title="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-pen-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                </svg>
              </button>
            )}

            <button
              className="w-[38px] h-[38px] text-[#6b7280] rounded-md flex items-center justify-center hover:bg-[#f3f4f6] hover:text-[#09041a]"
              data-tooltip-content="Hide on roadmap"
              disabled={
                !permissions?.includes(Permissions.EDIT_IDEA) || loading
              }
              onClick={onHideOnRoadmap}
              title="Hide on roadmap"
            >
              {props.hide_on_roadmap ? <EyeSlashIcon /> : <EyeIcon />}
            </button>

            {((is_member &&
              rbac_permissions?.includes(RbacPermissions.DELETE_IDEAS)) ||
              !is_member) && (
              <button
                className="delete-btn"
                data-tooltip-content="Delete"
                disabled={
                  !permissions?.includes(Permissions.DELETE_IDEA) || loading
                }
                onClick={() => {
                  setDeleteType('idea');
                  setDeleteId(props.id ?? 0);
                  setActivePage('delete');
                }}
                title="Delete"
              >
                <TrashIcon />
              </button>
            )}

            {is_admin && (
              <>
                <button
                  className="w-[38px] h-[38px] text-[#6b7280] rounded-md flex items-center justify-center hover:bg-[#f3f4f6] hover:text-[#09041a]"
                  data-tooltip-content="Upload Cover"
                  disabled={loading}
                  onClick={() => setShowUpload(true)}
                  title="Upload Cover"
                >
                  <CloudArrowUpFillIcon />
                </button>

                <button
                  className="w-[38px] h-[38px] text-[#6b7280] rounded-md flex items-center justify-center hover:bg-[#f3f4f6] hover:text-[#09041a]"
                  data-tooltip-content={`${props.is_archived ? 'Restore' : 'Archive'} Idea`}
                  disabled={loading}
                  onClick={onArchive}
                  title={`${props.is_archived ? 'Restore' : 'Archive'} Idea`}
                >
                  {props.is_archived ? <ArchiveOffIcon /> : <ArchiveFillIcon />}
                </button>
              </>
            )}
          </>
        )}
      </div>
      <div className="upvote-details">
        <UpvoteLabelLink id={props.id?.toString()} className="idea-h">
          {props.title}
        </UpvoteLabelLink>
        <div className="upvote-description">
          <pre>
            {!viewMore &&
            props.description !== undefined &&
            props.description?.length > 300
              ? props.description?.substring(0, 300).concat('...')
              : props.description}
          </pre>
          {props.description !== undefined &&
            props.description?.length > 300 && (
              <a className="more" onClick={() => setViewMore((prev) => !prev)}>
                {!viewMore ? 'Read more' : 'See less'}
              </a>
            )}
        </div>
        <div className="upvote-info-container">
          <div className="upvote-info">
            <div className="avatar">
              {props.author?.profile_photo &&
              props.author.profile_photo !=
                'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/profile-placeholder.svg' ? (
                <img src={props.author?.profile_photo} />
              ) : (
                props.author?.full_name?.charAt(0)
              )}
            </div>
            <span>
              {props.author?.full_name.substring(0, 20).trim()}
              {props.author?.full_name && props.author?.full_name.length > 20
                ? '...'
                : ''}
            </span>
            {(is_admin || (!is_admin && !project?.hide_datetime)) && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                <span>{moment(props.created_at).format('MMM D, YYYY')}</span>
              </>
            )}
          </div>
          {props.estimated_release_date && (
            <div className="estimate-release-date">
              Estimated Date:{' '}
              {formatDate(new Date(props.estimated_release_date))}
            </div>
          )}
        </div>
        <div className="upvote-tags">
          {(props.feedback_tags as FeedbackTag[])?.map((feedback_tag, idx) => (
            <div
              key={idx}
              className={`upvote-tag ${is_admin ? '' : 'tags-color'}`}
            >
              {feedback_tag.tag?.tag.substring(0, 10).trim()}
              {feedback_tag.tag?.tag && feedback_tag.tag?.tag.length > 10
                ? '...'
                : ''}
            </div>
          ))}
        </div>
      </div>
      <UploadPhoto
        id={props.id}
        image_type={ImageType.IDEA_COVER}
        maxFileSize={2097152}
        setModal={setShowUpload}
        setPhoto={onSetPhoto}
        show_modal={showUpload}
      />
    </div>
  );
};

export default UpvoteCard;
