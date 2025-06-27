import { Bell } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useUserNotification } from '../contexts/UserNotificationContext';
import { UserNotification } from '../types/notification';
import { getApi, patchApi } from '../utils/api/api';
import { ChatRightQuoteIcon } from './icons/chat-right-quote.icon';
import { Feedback } from '../types/feedback';
import { Notification } from '../types/notification';
import { useFeedback } from '../contexts/FeedbackContext';
import { usePanel } from '../contexts/PanelContext';
import { Link } from 'react-router-dom';
import { getSessionToken } from '../utils/localStorage';
import { useUser } from '../contexts/UserContext';
import { useApp } from '../contexts/AppContext';
import { convertDate } from '../utils/date';

export const Notifications = () => {
  const { is_public } = useApp();
  const {
    state: {
      userNotification: { has_unread, notifications },
    },
    setFetching,
    setUserNotification,
  } = useUserNotification();
  const { setSelectedIdea } = useFeedback();
  const { setActivePage, setIsOpen, setPanelCommentId } = usePanel();
  const { user: userContext } = useUser();
  const { moderation } = userContext ?? {};

  const [is_expanded, setExpanded] = useState(false);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNotifications(seeMore);

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (is_expanded) {
      getNotifications(seeMore);
    }
  }, [is_expanded]);

  const toggle = () => setExpanded((prev) => !prev);

  const getNotifications = (seeMore: boolean) => {
    setFetching(true);
    const params = {};
    if (!seeMore) {
      Object.assign(params, { limit: 3 });
    }

    getApi<UserNotification>({
      url: 'notifications',
      params,
      useSessionToken:
        is_public &&
        getSessionToken() !== undefined &&
        moderation?.allow_anonymous_access === true,
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setUserNotification(res.results.data);
      }
    });
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

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
    getNotifications(!seeMore);
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

  return (
    <div className="relative" ref={ref}>
      <button
        className="w-9 h-9 rounded-lg border border-purple-200 hover:bg-purple-50 text-purple-600 flex items-center justify-center"
        onClick={toggle}
      >
        <Bell size={18} />
      </button>

      {is_expanded && (
        <div className="w-[278px] left-auto block rounded-lg shadow-md right-0 absolute mt-3">
          <div className="bg-white border border-gray-300 box-border shadow-[0px_2px_8px_rgba(69,86,172,0.16)] rounded-[6px]">
            {/* {fetching && (
              <div style={{ paddingTop: '15px', paddingLeft: '15px' }}>
                <Loader />
              </div>
            )} */}
            <Fragment>
              <div className="max-h-[calc(100vh-100px)] overflow-y-auto w-full">
                <div className="flex flex-col items-start w-full px-2">
                  <Fragment>
                    <div className="flex justify-between w-full mb-3">
                      <span className="flex items-start text-gray-700 flex-row text-[12px] font-medium gap-2.5 leading-4 px-1.5 py-2.5">
                        NOTIFICATION
                      </span>
                      <span
                        className={`${
                          has_unread ? '' : 'opacity-50 '
                        }flex items-center text-[#5a00cd] flex-row text-[12px] font-bold leading-5 p-2 cursor-pointer`}
                        onClick={() => (has_unread ? markAllAsRead() : {})}
                      >
                        Mark all as read
                      </span>
                    </div>
                    <div className="px-1.5">
                      {notifications.map((notification, idx) => (
                        <Fragment key={idx}>
                          <div
                            className={`${
                              notification.is_read
                                ? 'text-gray-400 opacity-40'
                                : ''
                            } flex gap-2`}
                          >
                            <span>
                              <ChatRightQuoteIcon />
                            </span>
                            <span className="flex flex-col gap-2">
                              {notification.message ? (
                                <span
                                  className={`items-center ${notification.is_read ? '' : 'text-[#110733]'} font-normal text-[14px] leading-4`}
                                  dangerouslySetInnerHTML={{
                                    __html: notification.message,
                                  }}
                                />
                              ) : (
                                <span className="items-center text-[#110733] font-normal text-[14px] leading-4">
                                  {notification.notifier.full_name
                                    .substring(0, 20)
                                    .trim()}
                                  {notification.notifier.full_name.length > 20
                                    ? '...'
                                    : ''}
                                  {' mentioned you in this '}
                                  <Link
                                    to="#"
                                    className={`${redirecting ? 'cursor-default opacity-50' : ''} font-bold underline text-[#110733] hover:text-[#361895]`}
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
                                </span>
                              )}
                              <span className="flex justify-between text-[#9ca3af] font-bold text-[10px] leading-4">
                                {convertDate(notification.created_at)}
                              </span>
                            </span>
                            <span
                              className={`is-clickable font-normal text-[12px] italic ${notification.is_read ? 'text-gray-400 opacity-40' : 'text-[#5a00cd]'} text-[26px]`}
                              onClick={() =>
                                markAsReadOrUnread(notification.id)
                              }
                            >
                              &#x2022;
                            </span>
                          </div>
                          {idx < notifications.length - 1 && (
                            <hr className="bg-[#e1e0e5] border-0 h-px my-3" />
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </Fragment>
                </div>
              </div>
              <div
                className="is-clickable bg-[#faf8fb] rounded-b-lg text-[#6b7280] font-bold text-[14px] leading-5 text-center w-full py-0.5 mt-3"
                onClick={handleSeeMore}
              >
                <span>
                  {!seeMore
                    ? 'See more notifications'
                    : 'See less notifications'}
                </span>
              </div>
            </Fragment>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};
