import { memo, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Feedback, FeedbackTag } from '../../../types/feedback';
import { useUser } from '../../../contexts/UserContext';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { usePanel } from '../../../contexts/PanelContext';
import { patchApi } from '../../../utils/api/api';
import { Calendar4RangeIcon } from '../../../components/icons/calendar4-range.icon';
import { PinIcon } from '../../../components/icons/pin.icon';
import { PinFillIcon } from '../../../components/icons/pin-fill.icon';
import { UpVoteCounter } from '../../../components/UpVoteCounter';
import { formatDate } from '../../../utils/date';
import '../styles.css';
import StatusBadge from '../../../components/StatusBadge';
import ArchivedBadge from './ArchivedBadge';
import { useApp } from '../../../contexts/AppContext';

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

export const UpVoteEachList = memo(function UpVoteEachList({
  props,
  handleListFeedback,
}: {
  props: Feedback;
  handleListFeedback: () => void;
}) {
  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { listing },
    setSelectedIdea,
  } = useFeedback();
  const { setActivePage, setIsOpen } = usePanel();

  const [pinning, setPinning] = useState<boolean>(false);

  const is_admin = !is_public;

  const handleClickIdea = (feedback: Feedback) => {
    setSelectedIdea(feedback);
    setActivePage('add_comment');
    setIsOpen(true);
  };

  const pinIdea = () => {
    setPinning((prev) => !prev);
    patchApi<Feedback>(`feedback/${props.id}/pin`).then((res) => {
      setPinning((prev) => !prev);
      if (res.results.data) {
        handleListFeedback();
      }
    });
  };

  return (
    <div className="w-full">
      {props.is_archived && <ArchivedBadge className="rounded-t-lg" />}
      <div
        id="UpVoteEachList"
        className={props.is_archived ? 'rounded-b-lg pt-2' : 'rounded-lg'}
      >
        <UpVoteCounter data={props} />
        <div className="upvote-details">
          <UpvoteLabelLink
            id={(props.id ?? 0).toString()}
            className={`is-clickable idea-h ${is_admin ? 'text-[#110733]' : 'default-text-color'}`}
            onClick={() => handleClickIdea(props)}
          >
            {props.title}
          </UpvoteLabelLink>
          <span className="upvote-description">
            {props.description !== undefined && props.description?.length > 300
              ? props.description?.substring(0, 300).concat('... ')
              : props.description}
          </span>
          <div className="upvote-info">
            <figure className="image is-20 mr-8">
              <img
                className="is-rounded responsiveImage"
                src={props.author?.profile_photo}
              />
            </figure>
            <span>
              {props.author?.full_name?.substring(0, 20).trim()}
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
                <div className="line">
                  <span></span>
                </div>
              </>
            )}
            <div className="upvote-tags">
              {(props.feedback_tags as FeedbackTag[])?.map(
                (feedback_tag, idx) => (
                  <div
                    key={idx}
                    className={`upvote-tag ${is_admin ? '' : 'tags-color'}`}
                  >
                    {feedback_tag.tag?.tag.substring(0, 10).trim()}
                    {feedback_tag.tag?.tag && feedback_tag.tag?.tag.length > 10
                      ? '...'
                      : ''}
                  </div>
                )
              )}
            </div>
          </div>
          {/* <span
          className={`tag is-rounded${props.status ? '' : ' is-hidden'}`}
          style={{
            backgroundColor: `${props.status?.background_color}`,
            color: `${props.status?.font_color}`,
            outline: 'solid 1px',
            outlineColor: `${props.status?.border_color}`,
          }}
        >
          {props.status?.name}
        </span>
        <div className="has-padding-top-5">
          <span
            className="is-size-7 has-text-weight-bold"
            style={{ color: '#6F6FA2' }}
          >
            <CommentsImg src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/note.svg" />
            &nbsp;&nbsp;{props.comment_count}
          </span>
          &nbsp;&nbsp;
          {props.feedback_tags &&
            (props.feedback_tags as FeedbackTag[]).map((feedback_tag, idx) => (
              <span key={idx} className="tag tag-light multiple">
                {feedback_tag.tag?.tag}
              </span>
            ))}
        </div> */}
          {(props.estimated_release_date ||
            props.score ||
            props.status?.name) && (
            <>
              <hr className="p-0" />
              <div className="release-date-container flex justify-between h-[18px]">
                <div className="content">
                  <Calendar4RangeIcon size={10} />
                  Est Date:{' '}
                  {props.estimated_release_date
                    ? formatDate(new Date(props.estimated_release_date))
                    : ''}
                </div>
                <div className="content">Score: {props.score ?? 0}</div>
                <div className="content">
                  <StatusBadge status={props.status?.name.toString() ?? ''} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="top-right">
          <div className="flex is-size-7 is-pulled-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#6B7280"
              className="bi bi-chat-right-text"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
            &nbsp;&nbsp;{props.comment_count}
          </div>
          {(is_admin || (!is_admin && props.pinned)) && (
            <>
              <hr />
              <div
                className={`pin-icon ${
                  !pinning && !listing && is_admin ? 'is-clickable' : 'disabled'
                } ${props.pinned ? 'pinned' : 'unpinned'} ${
                  !is_admin ? 'unclickable' : ''
                }`}
                onClick={() =>
                  !pinning && !listing && is_admin ? pinIdea() : {}
                }
              >
                {props.pinned ? <PinFillIcon /> : <PinIcon />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
