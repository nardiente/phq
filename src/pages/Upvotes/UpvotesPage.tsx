import { Fragment, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Feedback } from '../../types/feedback';
import { getApi, postApi } from '../../utils/api/api';
import { setKaslKey } from '../../utils/localStorage';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { Permissions } from '../../types/common';
import { FadeLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { usePanel } from '../../contexts/PanelContext';
import { UpvoteFilters } from '../../components/UpvoteFilters';
import { UpVoteEachList } from './components/upvote-each-list';
import queryString from 'query-string';
import { useWhatsNew } from '../../contexts/WhatsNewContext';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import { Plus } from 'lucide-react';
import { SocketAction } from '../../types/socket';
import { useWidget } from '../../contexts/WidgetContext/WidgetProvider';
import { NewWidgetPreview } from '../../components/WidgetPreview/NewWidgetPreview';
import { clearQueryString } from '../../utils/uri';
import { useApp } from '../../contexts/AppContext';

export default function UpvotesPage() {
  const location = useLocation();

  const { is_public } = useApp();
  const { user: userDetails, setShowBanner } = useUser();
  const { permissions, project } = userDetails ?? {};
  const {
    state: {
      filteredIdeas,
      filter: { filtering },
      loading,
      roadmaps,
      selectedIdea,
      upvotes,
    },
    handleListFeedback,
    listUpvotes,
    setSelectedIdea,
    updateIdea,
  } = useFeedback();
  const { setActivePage, setActiveTab, setIsOpen, setPanelCommentId } =
    usePanel();
  const { setIsContinueReading, setWhatsNewId, setWhatsNewPreviewId } =
    useWhatsNew();
  const {
    state: { action, socket },
    setAction,
  } = useSocket();
  const {
    state: { widget },
    loadPublishedWidget,
  } = useWidget();

  if (upvotes.length === 0) {
    listUpvotes();
  }

  useEffect(() => {
    setActiveTab('/upvotes');
    if (location.search) {
      const params = queryString.parse(location.search);

      if (params.wni || params.pi) {
        setIsContinueReading(true);
        if (params.wni) setWhatsNewId(Number(params.wni));
        if (params.pi) setWhatsNewPreviewId(Number(params.pi));
        setActiveTab('/whatsnew');
      }
      if (params.c) {
        setPanelCommentId(Number(params.c));
      }
      if (
        typeof params['u'] === 'string' &&
        !Number.isNaN(Number(params['u'])) &&
        typeof params['k'] === 'string'
      ) {
        postApi({
          url: 'auth/activate',
          payload: { id: parseInt(params['u']), activation_key: params['k'] },
        }).then((res) => {
          if (res.results.error) {
            if (res.results.error == 'error.account.verified') {
              window.location.href = '/sign-in';
              setShowBanner(true);
              return;
            }
          }
          if (res.headers['kasl-key'] && res.results.data) {
            setKaslKey(res.headers['kasl-key'].toString());
            if (params.i) {
              window.location.href = `/?i=${params.i}`;
            }
          }
        });
      } else if (params.i) {
        getFeedback(Number(params.i));
      }

      clearQueryString();

      return;
    }

    if (project?.id && is_public) {
      loadPublishedWidget();
    }
  }, [project]);

  useEffect(() => {
    if (action === SocketAction.UPDATE_TAG && project?.id && selectedIdea?.id) {
      getFeedback(selectedIdea.id);
    }
    setAction();
  }, [action, project]);

  const getFeedback = (id: number) => {
    getApi<Feedback>({ url: `feedback/${id}` }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        updateIdea(data);
        setSelectedIdea(data);
        setActivePage('add_comment');
        setIsOpen(true);
        socket?.emit('message', {
          action: SocketAction.UPDATE_IDEA,
          data: { idea: data, projectId: project?.id },
        });
      }
    });
  };

  return (
    <>
      <Settings className="pb-0">
        <SettingsHeader
          title="Upvotes"
          filter={<UpvoteFilters roadmaps={roadmaps ?? []} />}
          primaryButton={
            <Button
              className={`${is_public ? 'primary-button-color' : ''}`}
              disabled={
                (!is_public && !permissions?.includes(Permissions.ADD_IDEA)) ||
                permissions?.length === 0
              }
              onClick={() => setIsOpen(true)}
            >
              <div
                className={`flex gap-2 ${is_public ? 'primary-button-color' : 'text-white'}`}
              >
                <Plus size={16} />
                New Idea
              </div>
            </Button>
          }
        />
        <div id="UpVoteList">
          {loading && filteredIdeas.length === 0 && (
            <div style={{ paddingTop: '50px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FadeLoader height={5} width={2} radius={2} margin={-10} />
              </div>
            </div>
          )}
          {!loading && is_public && permissions && permissions.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '30px',
                paddingRight: '30px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '10%',
                }}
              >
                <h4>
                  <div className="container no-upvote-background">
                    <div className="flex items-center justify-center mb-2 sad-face">
                      <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
                    </div>
                    <h3 className="no-upvote-header">
                      This public board is no longer available. Please contact
                      the admin.
                    </h3>
                  </div>
                </h4>
              </div>
            </div>
          ) : (
            <>
              {!loading && filteredIdeas.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: '10%',
                    }}
                  >
                    <h4>
                      <div className="container no-upvote-background">
                        <div className="flex items-center justify-center mb-2 sad-face">
                          <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
                        </div>
                        <h3 className="no-upvote-header">
                          {!filtering ? (
                            <>
                              {is_public
                                ? 'No ideas have been created… yet.'
                                : 'Now is a great time to add your first idea.'}
                            </>
                          ) : (
                            'Crickets and tumbleweeds. Please try again.'
                          )}
                        </h3>
                      </div>
                    </h4>
                  </div>
                </div>
              )}
              {filteredIdeas.length > 0 &&
                (!is_public ||
                  (is_public && permissions && permissions.length > 0)) && (
                  <div className="upvote-each-list-container">
                    {filteredIdeas.find((idea) => idea.pinned) && (
                      <p className="pinned-label">
                        Pinned idea
                        {filteredIdeas.filter((idea) => idea.pinned).length > 1
                          ? 's'
                          : ''}
                      </p>
                    )}
                    {filteredIdeas
                      ?.filter((idea) => !idea.draft)
                      .map((idea, idx) => (
                        <Fragment key={idx}>
                          <UpVoteEachList
                            props={idea}
                            handleListFeedback={handleListFeedback}
                          />
                          {filteredIdeas.find((idea) => idea.pinned) &&
                            idea.pinned &&
                            filteredIdeas.length - 1 > idx &&
                            !filteredIdeas[idx + 1].pinned && <hr />}
                        </Fragment>
                      ))}
                  </div>
                )}
            </>
          )}
        </div>
      </Settings>
      {is_public && widget?.config.sections?.ideas === true && (
        <NewWidgetPreview />
      )}
    </>
  );
}
