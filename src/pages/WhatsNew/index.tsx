import './styles.css';
import { getApi } from '../../utils/api/api';
import { ChangeType, Image, WhatsNew } from '../../types/whats-new';
import { FadeLoader } from 'react-spinners';
import { Permissions } from '../../types/common';
import { useUser } from '../../contexts/UserContext';
import { Fragment, useEffect, useState } from 'react';
import { useWhatsNew } from '../../contexts/WhatsNewContext';
import { usePanel } from '../../contexts/PanelContext';
import PostItem from '../../components/whats_new/post/PostItem';
import AddPostForm from '../../components/whats_new/add_post_form/AddPostForm';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import { WhatsNewFilter } from '../../components/WhatsNewFilter';
import Button from '../../components/Button';
import { Plus } from 'lucide-react';

export const WhatsNewPage = () => {
  const { user } = useUser();
  const { permissions } = user ?? {};
  const {
    state: { posts, whats_new_id, whats_new_preview_id },
    setIsContinueReading,
    setPosts,
  } = useWhatsNew();
  const { setActiveTab } = usePanel();

  const [change_types, setChangeTypes] = useState<ChangeType[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<number[]>([]);
  const [whats_new, setWhatsNew] = useState<WhatsNew>();

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<WhatsNew | undefined>(
    undefined
  );

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const listChangeType = () => {
    getApi<ChangeType[]>({ url: 'whatsnew/change-types' }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setChangeTypes(data);
      }
    });
  };

  const retrieveWhatsNew = (id?: number) => {
    getApi<WhatsNew>({
      url: `whatsnew/${id || whats_new_preview_id || whats_new_id}`,
    }).then((res) => {
      if (res.results.data) {
        setWhatsNew(res.results.data);
        setIsContinueReading(true);
        const uri = location.toString();
        if (uri.indexOf('?') > 0) {
          const clean_uri = uri.substring(0, uri.indexOf('?'));
          history.replaceState({}, '', clean_uri);
        }
      }
    });
  };

  const listWhatsNew = (filters: number[]) => {
    setStatusFilter(filters);
    const url = is_public
      ? `whatsnew/public/${window.location.host}`
      : 'whatsnew';

    setFetching(true);
    getApi<WhatsNew[]>({
      url,
      params: { change_type_id: filters.join(',') },
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
        setIsContinueReading(false);
      }
    });
  };

  const openPostForm = (post?: WhatsNew) => {
    setShowAddForm(true);
    setSelectedPost(post);
  };

  useEffect(() => {
    setActiveTab('/whatsnew');
    listWhatsNew([]);
    listChangeType();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const post_images = document.querySelectorAll(
        '[src^="https://s3.amazonaws.com/uat-app.productfeedback.co/whats-new-images/"]'
      ) as NodeListOf<HTMLImageElement>;
      for (let index = 0; index < post_images.length; index++) {
        const post_image = post_images[index];
        if (whats_new?.images && whats_new?.images.length > 0) {
          const image = whats_new.images.find(
            (image) => image.image == post_image.src
          );
          const image_width = image?.image_width;
          post_image.style.width = image_width
            ? `${image_width}${!image_width.includes('px') ? 'px' : ''}`
            : 'auto';
        }
      }
    }, 100);
  }, [whats_new]);

  useEffect(() => {
    setTimeout(() => {
      posts?.forEach((whats_new) => {
        if (whats_new?.images && whats_new?.images.length > 0) {
          whats_new.images.forEach((image) => {
            const post_image = document.querySelector(
              `[src="${image.image}"]`
            ) as HTMLImageElement;
            if (post_image) {
              const image_width = image?.image_width;
              post_image.style.width = image_width
                ? `${image_width}${!image_width.includes('px') ? 'px' : ''}`
                : 'auto';
            }
          });
        }
      });
    }, 100);
  }, [posts]);

  useEffect(() => {
    if (whats_new_id > 0 || whats_new_preview_id > 0) {
      retrieveWhatsNew();
    }
  }, [whats_new_id, whats_new_preview_id]);

  return (
    <Fragment>
      {!showAddForm ? (
        <Settings className="pb-0">
          <SettingsHeader
            title="What's New"
            filter={
              <div
                className="flex justify-end"
                style={{ width: is_public ? '90%' : '80%' }}
              >
                <div className="field is-grouped">
                  <WhatsNewFilter
                    listChangeType={listChangeType}
                    change_types={change_types}
                    listWhatsNew={listWhatsNew}
                  />
                </div>
              </div>
            }
            primaryButton={
              !is_public ? (
                <Button
                  text={
                    <>
                      <Plus size={16} />
                      New Post
                    </>
                  }
                  disabled={
                    !permissions?.includes(Permissions.ADD_POST) ||
                    permissions?.length === 0
                  }
                  onClick={() => openPostForm(undefined)}
                />
              ) : (
                <></>
              )
            }
          />
          {(!posts ||
            (posts && posts.length === 0 && statusFilter.length === 0)) &&
            fetching && (
              <div className="flex justify-center items-center">
                <FadeLoader height={5} width={2} radius={2} margin={-10} />
              </div>
            )}
          <div id="WhatsNew" className="py-8">
            {posts && (
              <Fragment>
                {(posts.length === 0 ||
                  (is_public && permissions?.length === 0)) &&
                  !fetching && (
                    <div className="flex flex-col items-center">
                      {statusFilter.length === 0 ||
                      (is_public && permissions?.length === 0) ? (
                        <>
                          {' '}
                          <div className="flex justify-center mb-2 sad-face">
                            <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
                          </div>
                          <h3 className="no-whatsnew-header">
                            {is_public && permissions?.length === 0
                              ? 'This public board is no longer available. Please contact the admin.'
                              : 'No posts have been created... yet.'}
                          </h3>
                          {!is_public && (permissions?.length ?? 0) > 0 && (
                            <>
                              <h4 className="no-whatsnew-sub">
                                Now is a great time to add your first post!
                              </h4>

                              <div className="no-whatsnew-sub">
                                Need more info? Check out this{' '}
                                <a
                                  href="https://support.producthq.io/article/how-to-create-a-whats-new-post"
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#5A00CD',
                                  }}
                                >
                                  link.
                                </a>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <h4>Crickets and tumbleweeds. Please try again.</h4>
                      )}
                    </div>
                  )}
                {posts.length > 0 &&
                  (!is_public ||
                    (is_public && (permissions?.length ?? 0) > 0)) &&
                  (posts as WhatsNew[])?.map((whats_new, idx) => (
                    <Fragment key={idx}>
                      <PostItem
                        whats_new={whats_new}
                        openPostForm={openPostForm}
                      />
                    </Fragment>
                  ))}
              </Fragment>
            )}
          </div>
        </Settings>
      ) : (
        <AddPostForm
          post={selectedPost}
          setShowAddForm={setShowAddForm}
          listWhatsNew={listWhatsNew}
        />
      )}
    </Fragment>
  );
};
