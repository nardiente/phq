import {
  Fragment,
  LegacyRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { getApi, patchApi } from '../../utils/api/api';
import moment from 'moment';
import { useUser } from '../../contexts/UserContext';
import { useUserNotification } from '../../contexts/UserNotificationContext';
import { UserNotification } from '../../types/notification';
import { Feedback } from '../../types/feedback';
import { Notification } from '../../types/notification';
import { useFeedback } from '../../contexts/FeedbackContext';
import { usePanel } from '../../contexts/PanelContext';
import { getSessionToken } from '../../utils/localStorage';
import { getKaslKey } from '../../utils/localStorage';
import { BellIcon } from '../icons/bell.icon';
import { Loader } from 'lucide-react';
import { ChatRightQuoteIcon } from '../icons/chat-right-quote.icon';
import { useApp } from '../../contexts/AppContext';

export const DropDownNotification = (props: {
  container_class?: string;
  content?: ReactNode;
  content_class?: string;
  content_container_class?: string;
  label?: ReactNode;
  label_class?: string;
  tab_index?: number;
}) => {
  const ref = useRef<HTMLElement>();

  const { is_public } = useApp();
  const { user } = useUser();
  const { moderation } = user ?? {};
  const {
    state: { fetching, userNotification },
    setFetching,
    setUserNotification,
  } = useUserNotification();
  const { setSelectedIdea } = useFeedback();
  const { setActivePage, setIsOpen, setPanelCommentId } = usePanel();

  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [is_expanded, setExpanded] = useState(false);
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const convertDate = (date: string) => {
    const currentDate = moment(date);
    const diffInMinutes = moment().diff(currentDate, 'minutes');
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    const diffInHours = moment().diff(currentDate, 'hours');
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    const diffInDays = moment().diff(currentDate, 'days');
    if (diffInDays < 3) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    return currentDate.format('MMM D, YYYY');
  };

  const toggle = () => setExpanded(!is_expanded);

  const getNotifications = (seeMore: boolean) => {
    setFetching(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params,
      // is_public && moderation?.allow_anonymous_access === true,
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setUserNotification(res.results.data);
      }
    });
  };

  const markAsReadOrUnread = (id: number) => {
    patchApi<UserNotification>(
      `notifications/mark-as-read-or-unread/${id}`
    ).then((res) => {
      if (res.results.data) {
        getNotifications(seeMore);
      }
    });
  };

  const getFeedback = (notification: Notification) => {
    setRedirecting((prev) => !prev);
    getApi<Feedback>({ url: `feedback/${notification.feedback_id}` }).then(
      (res) => {
        setRedirecting((prev) => !prev);
        if (res.results.data) {
          setSelectedIdea(res.results.data);
          setActivePage('add_comment');
          setIsOpen(true);
          if (!notification.is_read) {
            markAsReadOrUnread(notification.id);
          }
          toggle();
        }
      }
    );
  };

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
    getNotifications(!seeMore);
  };

  const markAllAsRead = () => {
    patchApi<UserNotification[]>('notifications/mark-all-as-read').then(
      (res) => {
        if (res.results.data) {
          getNotifications(seeMore);
        }
      }
    );
  };

  useEffect(() => {
    if (
      !is_public ||
      (is_public &&
        (getKaslKey() !== undefined ||
          (moderation?.allow_anonymous_access === true &&
            getSessionToken() !== undefined)))
    ) {
      getNotifications(seeMore);
    }

    const expand = (e: any) => {
      if (!ref.current || !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', expand);
    return () => {
      document.removeEventListener('mousedown', expand);
    };
  }, []);

  return (
    <div id="DropDownNotification" ref={ref as LegacyRef<HTMLDivElement>}>
      <div
        className={`dropdown ${is_expanded ? ' is-active' : ''}${
          props.container_class ? ` ${props.container_class}` : ''
        }`}
      >
        <div className="dropdown-trigger">
          <button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            className={`button notification-bell${
              userNotification?.has_unread || is_expanded
                ? ' unread-notif'
                : ' not-expanded'
            }`}
            onClick={() => {
              toggle();
              getNotifications(seeMore);
            }}
            tabIndex={props.tab_index}
          >
            <Fragment>
              <BellIcon />
            </Fragment>
          </button>
        </div>
        <div
          aria-hidden={!is_expanded}
          className={`left-auto dropdown-menu width-278px${
            props.content_container_class
              ? ` ${props.content_container_class}`
              : ''
          }`}
          id="dropdown-menu"
          role="menu"
        >
          <div
            className={`dropdown-content${
              props.content_class ? ` ${props.content_class}` : ''
            }`}
          >
            {fetching && (
              <div style={{ paddingTop: '15px', paddingLeft: '15px' }}>
                <Loader />
              </div>
            )}
            {!fetching && (
              <Fragment>
                <div
                  style={{
                    maxHeight: 'calc(100vh - 100px)',
                    overflowY: 'auto',
                    width: '100%',
                  }}
                >
                  <div className="drop-down-status padding-0-8px">
                    <Fragment>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <span className="drop-down-label">NOTIFICATION</span>
                        <span
                          className={`${
                            userNotification?.has_unread
                              ? 'is-clickable '
                              : 'disabled '
                          }mark-all`}
                          onClick={() =>
                            userNotification?.has_unread ? markAllAsRead() : {}
                          }
                        >
                          Mark all as read
                        </span>
                      </div>
                      <div style={{ paddingLeft: '6px', paddingRight: '6px' }}>
                        {userNotification?.notifications.map(
                          (notification, idx) => (
                            <Fragment key={idx}>
                              <div
                                className={
                                  notification.is_read ? 'message-read' : ''
                                }
                                style={{
                                  display: 'flex',
                                  marginBottom: '12px',
                                }}
                              >
                                <ChatRightQuoteIcon />
                                <span className="notification-message">
                                  {notification.message ? (
                                    notification.message
                                  ) : (
                                    <>
                                      {notification.notifier.full_name
                                        .substring(0, 20)
                                        .trim()}
                                      {notification.notifier.full_name.length >
                                      20
                                        ? '...'
                                        : ''}
                                      {' mentioned you in this '}
                                      <Link
                                        to="#"
                                        className={
                                          redirecting ? 'disabled' : ''
                                        }
                                        onClick={() => {
                                          if (!redirecting) {
                                            setPanelCommentId(
                                              notification.feedback_comment_id
                                            );
                                            getFeedback(notification);
                                          }
                                        }}
                                        aria-disabled={redirecting}
                                      >
                                        idea
                                      </Link>
                                      .
                                    </>
                                  )}
                                  <div className="notification-time">
                                    {convertDate(notification.created_at)}
                                    <span
                                      className="is-clickable for-dot"
                                      onClick={() =>
                                        markAsReadOrUnread(notification.id)
                                      }
                                    >
                                      &#x2022;
                                    </span>
                                  </div>
                                </span>
                              </div>
                              {idx <
                                userNotification.notifications.length - 1 && (
                                <hr className="notification-hr" />
                              )}
                            </Fragment>
                          )
                        )}
                      </div>
                    </Fragment>
                  </div>
                </div>
                <div
                  className="is-clickable see-all-notification"
                  onClick={handleSeeMore}
                >
                  <span>
                    {!seeMore
                      ? 'See more notifications'
                      : 'See less notifications'}
                  </span>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
