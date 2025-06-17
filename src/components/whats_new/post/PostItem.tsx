import 'react-tooltip/dist/react-tooltip.css';
import moment from 'moment';
import EmojiList from '../../../components/EmojiList';
import { patchApi, postApi, putApi } from '../../../utils/api/api';
import Emoji from '../../../components/Emoji';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Tooltip } from 'react-tooltip';
import './styles.css';
import ReactQuill from 'react-quill';
import { Publications } from '../../../utils/constants';
import { Permissions, RbacPermissions } from '../../../types/common';
import { Image, WhatsNew } from '../../../types/whats-new';
import { PinFillIcon } from '../../../components/icons/pin-fill.icon';
import { TrashIcon } from '../../../components/icons/trash.icon';
import { useUser } from '../../../contexts/UserContext';
import { CSSProperties, useEffect, useState } from 'react';
import { useWhatsNew } from '../../../contexts/WhatsNewContext';
import { usePanel } from '../../../contexts/PanelContext';
import { getIPAddress } from '../../../utils/token';
import { useApp } from '../../../contexts/AppContext';

const PostItem = ({
  style,
  whats_new,
  openPostForm,
}: {
  style?: CSSProperties;
  whats_new: WhatsNew;
  openPostForm: (post: WhatsNew) => void;
}) => {
  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { posts },
    setPosts,
    updatePost,
  } = useWhatsNew();
  const { setActivePage, setDeleteId, setDeleteType, setIsOpen } = usePanel();

  const [copied_id, setCopiedId] = useState<number>(0);
  const [socmed_url, setSocmedUrl] = useState<string>('');
  const [pinning, setPinning] = useState<boolean>(false);

  const is_admin = !is_public;

  const addEmoji = async (type: any) => {
    const { emoji_list, my_emoji } =
      whats_new ||
      ({ emoji_list: [], my_emoji: [] } as {
        emoji_list: any[];
        my_emoji: string[];
      });
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

    const oldComment = whats_new;

    setPosts(
      whats_new
        ? posts?.map((item) => {
            return item.id === whats_new.id
              ? {
                  ...item,
                  emoji_list: newEmojiList,
                  my_emoji: newMyEmoji,
                }
              : item;
          })
        : posts
    );

    await postApi({
      url: `whatsnew/${whats_new?.id}/emoji`,
      payload: { type },
    }).then((res) => {
      if (res.results.errors) {
        setPosts(
          oldComment
            ? posts?.map((item) => {
                return item.id === oldComment.id
                  ? {
                      ...item,
                      emoji_list: newEmojiList,
                      my_emoji: newMyEmoji,
                    }
                  : item;
              })
            : posts
        );
      }
    });
  };

  const handleDelete = () => {
    setDeleteType('post');
    setDeleteId(whats_new.id);
    setActivePage('delete');
    setIsOpen(true);
  };

  const handleOnDraft = () => {
    putApi(`whatsnew/${whats_new.id}/publication`, {
      publication: Publications.DRAFT,
    }).then((res) => {
      if (res.results.data) {
        updatePost(res.results.data);
      }
    });
  };

  const onClickPost = async () => {
    postApi<WhatsNew>({
      url: `whatsnew/${whats_new.id}/clicks`,
      payload: { ip_address: await getIPAddress() },
    });
  };

  const onSharePost = async () => {
    postApi<WhatsNew>({
      url: `whatsnew/${whats_new.id}/shares`,
      payload: { ip_address: await getIPAddress() },
    });
  };

  const pin = () => {
    setPinning(true);
    patchApi<WhatsNew[]>(`whatsnew/${whats_new.id}/pin`)
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          setPosts(
            data.map((datum) => {
              if (!datum.images) {
                datum.images = [
                  {
                    image: datum.image,
                    image_height: datum.image_height,
                    image_width: datum.image_width,
                  },
                ] as Image[];
              }
              return datum;
            })
          );
        }
      })
      .finally(() => setPinning(false));
  };

  useEffect(() => {
    let url = user?.project?.custom_domain;
    if (!url) {
      url = `${user?.project?.portal_subdomain}.producthq.io`;
    }
    setSocmedUrl(`http://${url}`);
  }, [user?.project]);

  useEffect(() => {
    if ((whats_new.images?.length ?? 0) > 0) {
      const qlEditor = document.querySelector(
        '[class="ql-editor"]'
      ) as HTMLDivElement;
      if (qlEditor) {
        const imgTags = qlEditor.getElementsByTagName(
          'img'
        ) as HTMLCollectionOf<HTMLImageElement>;
        for (let i = 0; i < imgTags.length; i++) {
          const imgTag = imgTags[i];
          const image = whats_new.images?.find(
            (image) => image.image === imgTag.src
          );
          if (image) {
            const image_width =
              image.image_width && image.image_width !== 'auto'
                ? image.image_width.replace(/\D/g, '')
                : '';
            if (image_width.length > 0) {
              imgTag.width = Number(image_width);
            }
          }
        }
      }
    }
  }, [whats_new.images]);

  return (
    <div className="whats-new" style={style}>
      {!whats_new.scheduled_date && (
        <div className="date-container">
          <label className="date">
            {is_admin || (!is_admin && !user?.project?.hide_datetime)
              ? moment(whats_new.publish_on_date).format('D MMM YYYY')
              : ''}
          </label>
          <div className="button-icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="post-container">
        <div className="post">
          <div className="post-title" onClick={onClickPost}>
            <div className="title-text">
              {whats_new.publication === 'Draft' ? (
                <span className="draft">[DRAFT]</span>
              ) : (
                ''
              )}
              <a
                href={`/whatsnew/${whats_new.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {whats_new.title}
              </a>
            </div>
            <div className="change-types">
              {whats_new.change_types?.map((change_type, idx) => (
                <div
                  key={idx}
                  className="change-type"
                  style={{
                    backgroundColor: `${change_type.change_type_color?.background_color}`,
                  }}
                >
                  <label
                    style={{
                      color: `${change_type.change_type_color?.font_color}`,
                    }}
                  >
                    {change_type.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="description" onClick={onClickPost}>
            <ReactQuill
              value={whats_new.formatted_description}
              readOnly={true}
              theme="snow"
            />
          </div>
          {whats_new.scheduled_date && (
            <div style={{ marginLeft: 'auto' }}>
              <label className="scheduled-label">Scheduled:</label>
              <label className="scheduled-date">
                {`${moment(whats_new.scheduled_date).format(
                  'dddd, D MMM'
                )} at ${moment(whats_new.scheduled_date).format('h')}:${moment(
                  whats_new.scheduled_date
                ).format('mm')} ${moment(whats_new.scheduled_date).format(
                  'a'
                )}`}
              </label>
              {user?.rbac_permissions.includes(
                RbacPermissions.MOVE_ANY_POST_FROM_PUBLISHED_TO_DRAFT
              ) && (
                <>
                  <div className="line" style={{ margin: '0 8px' }} />
                  <label
                    className="schedule_cancel_btn"
                    onClick={handleOnDraft}
                  >
                    Cancel
                  </label>
                </>
              )}
            </div>
          )}
          <div className="post-bottom">
            <div className="emojis-container">
              <div className="emojis">
                <EmojiList comment={whats_new} addEmoji={addEmoji} />
              </div>
              <Emoji addEmoji={addEmoji} is_draft={false} />
            </div>
            <div className="socmed-container">
              <div className="socmeds">
                <span>
                  <FacebookShareButton
                    url={`${socmed_url}/whatsnew/${whats_new.id}`}
                    disabled={
                      !user?.permissions.includes(Permissions.EDIT_POST)
                    }
                    onClick={onSharePost}
                    windowWidth={2000}
                    windowHeight={2000}
                  >
                    <img
                      className="image is-40x40 responsiveImage"
                      src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/facebook.svg"
                    />
                  </FacebookShareButton>
                </span>
                <span>
                  <TwitterShareButton
                    url={`${socmed_url}/whatsnew/${whats_new.id}`}
                    disabled={
                      !user?.permissions.includes(Permissions.EDIT_POST)
                    }
                    onClick={onSharePost}
                    windowWidth={2000}
                    windowHeight={2000}
                  >
                    <img
                      className="image is-40x40 responsiveImage"
                      src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/twitter.svg"
                    />
                  </TwitterShareButton>
                </span>
                <span>
                  <a
                    id={`hyperlink-tooltip-${whats_new.id}`}
                    className="is-clickable"
                    data-tooltip-content="Click to copy link."
                  >
                    <img
                      className="image is-40x40 responsiveImage"
                      onClick={() => {
                        if (user?.permissions.includes(Permissions.EDIT_POST)) {
                          navigator.clipboard.writeText(
                            `${socmed_url}/whatsnew/${whats_new.id}`
                          );
                          onSharePost();
                          setCopiedId(whats_new.id);
                          setTimeout(() => {
                            setCopiedId(0);
                          }, 3000);
                        }
                      }}
                      src="https://s3.amazonaws.com/uat-app.productfeedback.co/assets/hyperlink-button.svg"
                    />
                  </a>
                  {user?.permissions.includes(Permissions.EDIT_POST) && (
                    <Tooltip
                      anchorId={`hyperlink-tooltip-${whats_new.id}`}
                      className="tooltip-copy"
                    />
                  )}
                </span>
              </div>
              {copied_id === whats_new.id && (
                <label className="msg-label label is-size-7 success">
                  Copied.
                </label>
              )}
            </div>
          </div>
        </div>
        {(is_admin || (!is_admin && whats_new.pinned)) && (
          <div className="toolbar-container">
            <div className="toolbar">
              {is_admin &&
                ((user?.rbac_permissions.includes(
                  RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                ) &&
                  whats_new.created_by == user.user?.id) ||
                  ([
                    RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST,
                    RbacPermissions.SCHEDULE_OTHERS_POST,
                  ].some((rbac_permission) =>
                    user?.rbac_permissions.includes(rbac_permission)
                  ) &&
                    whats_new.created_by != user?.user?.id)) && (
                  <button
                    onClick={() => openPostForm(whats_new)}
                    disabled={
                      is_admin &&
                      !user?.permissions.includes(Permissions.EDIT_POST)
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
              {is_admin &&
                ((whats_new.created_by != user?.user?.id &&
                  user?.rbac_permissions.includes(
                    RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
                  )) ||
                  (whats_new.created_by === user?.user?.id &&
                    user.rbac_permissions.includes(
                      RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                    ))) && (
                  <button
                    onClick={handleDelete}
                    disabled={
                      is_admin &&
                      !user.permissions.includes(Permissions.DELETE_POST)
                    }
                  >
                    <TrashIcon />
                  </button>
                )}
              <button
                className={`${whats_new.pinned ? 'pinned' : ''} ${
                  !is_admin ? 'cursor-default' : ''
                }`}
                onClick={() => (is_admin ? pin() : {})}
                disabled={pinning}
              >
                <PinFillIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
