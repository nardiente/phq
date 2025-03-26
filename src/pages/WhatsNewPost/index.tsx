import moment from 'moment';
import * as React from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FadeLoader } from 'react-spinners';
import { Tooltip } from 'react-tooltip';
import './styles.css';
import { useWhatsNew } from '../../contexts/WhatsNewContext';
import { Image, WhatsNew } from '../../types/whats-new';
import EmojiList from '../../components/EmojiList';
import Emoji from '../../components/Emoji';
import { getApi, postApi } from '../../utils/api/api';
import { usePanel } from '../../contexts/PanelContext';
import { PageHeader } from '../../components/PageHeader';
import { getIPAddress } from '../../utils/token';

const WhatsNewPost = () => {
  const quillRef = React.useRef<ReactQuill>(null);
  const is_public = import.meta.env.SYSTEM_TYPE === 'public';

  const { post_id } = useParams<{ post_id: string }>();

  const {
    state: { posts },
    setPosts,
  } = useWhatsNew();
  const { setActiveTab } = usePanel();

  const [copied_id, setCopiedId] = React.useState<number>(0);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [whats_new, setWhatsNew] = React.useState<WhatsNew>();

  React.useEffect(() => {
    if (whats_new) {
      onViewPost();
    }
  }, [whats_new]);

  const onViewPost = async () => {
    postApi<WhatsNew>({
      url: `whatsnew/${whats_new?.id}/views`,
      payload: { ip_address: await getIPAddress() },
    });
  };

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

  const retrieveWhatsNew = (posts: WhatsNew[], id: string) => {
    const post = posts.find((post) => post.id === Number(id));
    setWhatsNew(post);
  };

  const listPost = () => {
    const url = is_public
      ? `whatsnew/public/${window.location.host}`
      : 'whatsnew';
    setFetching(true);
    getApi<WhatsNew[]>({
      url,
      useCustomerKey: true,
    }).then((res) => {
      setFetching(false);
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
        retrieveWhatsNew(data, post_id ?? '');
      }
    });
  };

  React.useEffect(() => {
    setActiveTab('/whatsnew');
    listPost();
    quillRef?.current?.getEditor().disable();
  }, []);

  return (
    <React.Fragment>
      <PageHeader header="What's New" />
      <div
        id="WhatsNew"
        style={
          !fetching && (!whats_new || whats_new.publication === 'Draft')
            ? {
                justifyContent: 'center',
                marginTop: '-75px',
              }
            : {}
        }
      >
        <div className="whats-new">
          {fetching && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '230px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FadeLoader height={5} width={2} radius={2} margin={-10} />
              </div>
            </div>
          )}
          {!fetching && (
            <React.Fragment>
              {(!whats_new || whats_new.publication === 'Draft') && (
                <div className="container">
                  <h4>
                    This post has been deleted or made private. Please contact
                    the admin for more information.
                  </h4>
                </div>
              )}
              {whats_new && whats_new.publication !== 'Draft' && (
                <React.Fragment>
                  {!whats_new.scheduled_date && (
                    <div className="date-container">
                      <label className="date">
                        {moment(whats_new.publish_on_date).format('D MMM YYYY')}
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
                      <div className="post-title">
                        <div className="title-text">
                          {whats_new.publication === 'Draft' ? (
                            <span className="draft">[DRAFT]</span>
                          ) : (
                            ''
                          )}
                          {whats_new.title}
                        </div>
                        <div className="change-types">
                          {whats_new.change_types.map((change_type, idx) => (
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
                      <div className="description">
                        <ReactQuill
                          value={whats_new.formatted_description}
                          readOnly={true}
                          theme={'bubble'}
                        />
                      </div>
                      {whats_new.scheduled_date && (
                        <div style={{ marginLeft: 'auto' }}>
                          <label className="scheduled-label">Scheduled:</label>
                          <label className="scheduled-date">
                            {`${moment(whats_new.scheduled_date).format(
                              'dddd, D MMM'
                            )} at ${moment(whats_new.scheduled_date).format(
                              'h'
                            )}:${moment(whats_new.scheduled_date).format(
                              'mm'
                            )} ${moment(whats_new.scheduled_date).format('a')}`}
                          </label>
                          <div className="line" style={{ margin: '0 8px' }} />
                          <label className="schedule_cancel_btn">Cancel</label>
                        </div>
                      )}
                      <div className="post-bottom">
                        <div className="emojis-container">
                          <div className="emojis">
                            <EmojiList
                              comment={whats_new}
                              addEmoji={addEmoji}
                            />
                          </div>
                          <Emoji addEmoji={addEmoji} is_draft={false} />
                        </div>
                        <div className="socmed-container">
                          <div className="socmeds">
                            <span>
                              <FacebookShareButton
                                url={window.location.href}
                                windowWidth={15}
                              >
                                <img
                                  className="image is-40x40 responsiveImage"
                                  src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/facebook.svg"
                                />
                              </FacebookShareButton>
                            </span>
                            <span>
                              <TwitterShareButton
                                url={window.location.href}
                                windowWidth={15}
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
                                    navigator.clipboard.writeText(
                                      window.location.href
                                    );
                                    setCopiedId(whats_new.id);
                                    setTimeout(() => {
                                      setCopiedId(0);
                                    }, 3000);
                                  }}
                                  src="https://s3.amazonaws.com/uat-app.productfeedback.co/assets/hyperlink-button.svg"
                                />
                              </a>
                              <Tooltip
                                anchorId={`hyperlink-tooltip-${whats_new.id}`}
                                className="tooltip-copy"
                              />
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
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhatsNewPost;
