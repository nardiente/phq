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
  const { user } = useUser();
  const { setActivePage, setDeleteId, setDeleteType } = usePanel();

  const is_admin = import.meta.env.VITE_SYSTEM_TYPE === 'admin';
  const is_member = user?.user?.role_id;

  const [viewMore, setViewMore] = useState<boolean>(false);

  return (
    <div id="UpVoteEachList">
      <div className="upvote-counter-container">
        <UpVoteCounter data={props} />
        {is_admin && (
          <>
            <div className="line" />
            {((is_member &&
              user.rbac_permissions.includes(
                RbacPermissions.CREATE_EDIT_IDEAS
              )) ||
              !is_member) && (
              <button
                className="edit-button"
                data-tooltip-content="Edit"
                onClick={() => setActivePage('edit_idea')}
                role="button"
                disabled={
                  !user?.permissions.includes(Permissions.EDIT_IDEA) ||
                  props.not_administer
                }
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

            {((is_member &&
              user.rbac_permissions.includes(RbacPermissions.DELETE_IDEAS)) ||
              !is_member) && (
              <button
                className="delete-btn"
                data-tooltip-content="Delete"
                onClick={() => {
                  setDeleteType('idea');
                  setDeleteId(props.id ?? 0);
                  setActivePage('delete');
                }}
                disabled={!user?.permissions.includes(Permissions.DELETE_IDEA)}
              >
                <TrashIcon />
              </button>
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
            {(is_admin || (!is_admin && !user?.project?.hide_datetime)) && (
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
            <div key={idx} className="upvote-tag">
              {feedback_tag.tag?.tag.substring(0, 10).trim()}
              {feedback_tag.tag?.tag && feedback_tag.tag?.tag.length > 10
                ? '...'
                : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpvoteCard;
