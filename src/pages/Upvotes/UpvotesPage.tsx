import { Fragment, useEffect } from 'react';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import moment from 'moment';
import { Feedback, Tag } from '../../types/feedback';
import { getApi, postApi } from '../../utils/api/api';
import { Roadmap } from '../../types/roadmap';
import { getCustomerKaslKey, setKaslKey } from '../../utils/localStorage';
import { getKaslKey } from '../../utils/localStorage';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { Permissions } from '../../types/common';
import { FadeLoader } from 'react-spinners';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePanel } from '../../contexts/PanelContext';
import { PageHeader } from '../../components/PageHeader';
import { UpvoteFilters } from '../../components/UpvoteFilters';
import styled from 'styled-components';
import { UpVoteEachList } from './components/upvote-each-list';
import { AddYourBoardModal } from '../../components/AddYourBoardModal';
import queryString from 'query-string';

const ListDiv = styled.div`
  background-color: var(--public-view-background-color);
  padding-top: 15px;
`;

export default function UpvotesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user: userDetails, setShowBanner } = useUser();
  const { moderation, permissions, project, user } = userDetails ?? {};
  const {
    state: {
      filters: { filtering, sort, status, tags: filterTags, title },
      ideas,
      selectedIdea,
    },
    setListing,
    setIdeas,
    setSelectedIdea,
    setTags,
    updateIdea,
    updateIdeaInRoadmap,
  } = useFeedback();
  const {
    setActivePage,
    setActiveTab,
    setIsContinueReading,
    setIsOpen,
    setPanelCommentId,
    setWhatsNewId,
    setWhatsNewPreviewId,
  } = usePanel();
  const {
    state: { tags },
    setSocketTags,
  } = useSocket();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const [fetching, setFetching] = useState<boolean>(true);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [remindAddBoard, setRemindAddBoard] = useState<boolean | undefined>();

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);

      if (params.wni || params.pi) {
        setIsContinueReading(true);
        if (params.wni) setWhatsNewId(Number(params.wni));
        if (params.pi) setWhatsNewPreviewId(Number(params.pi));
        setActiveTab('/changelog');
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
          payload: {
            id: parseInt(params['u']),
            activation_key: params['k'],
          },
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

      const uri = location.toString();
      if (uri.indexOf('?') > 0) {
        const clean_uri = uri.substring(0, uri.indexOf('?'));
        window.history.replaceState({}, document.title, clean_uri);
      }

      return;
    }

    handleListFeedback(false);
  }, []);

  useEffect(() => {
    setRemindAddBoard(
      !is_public &&
        project !== undefined &&
        user &&
        !user.stop_remind_add_board &&
        (!user.remind_3_days ||
          (user.remind_3_days &&
            moment().diff(moment(user.remind_3_days_timestamp), 'minutes') >=
              4320))
    );
  }, [user]);

  const getFeedback = (id: number) => {
    getApi<Feedback>(`feedback/${id}`).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        updateIdea(data);
        updateIdeaInRoadmap(data.status_id ?? 0, data);
        setSelectedIdea(data);
        setActivePage('add_comment');
        setIsOpen(true);
      }
    });
  };

  const handleGetStatus = () => {
    getApi<Roadmap[]>(`roadmaps?domain=${window.location.host}`).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setRoadmaps(data);
      }
    });
  };

  const handleListTag = () => {
    getApi<Tag[]>(
      'tags',
      is_public
        ? {
            domain: window.location.host,
          }
        : undefined,
      undefined,
      is_public &&
        moderation?.user_login === true &&
        getKaslKey() === undefined &&
        getCustomerKaslKey() !== undefined
    ).then((res) => {
      if (is_public && res.results.error === 'error-client.bad-request') {
        navigate('/');
      }
      if (res.results.data) {
        setTags(res.results.data);
      }
      handleGetStatus();
    });
  };

  const handleListFeedback = (filtering: boolean) => {
    const url = is_public
      ? `feedback/list/${window.location.host}`
      : 'feedback/list-upvote';

    setFetching(true);
    setListing(true);
    getApi<Feedback[]>(
      url,
      {
        sort,
        status,
        tags: filterTags.join(','),
        title,
      },
      is_public && moderation?.user_login === true
    )
      .then((res) => {
        setFetching(false);
        setListing(false);
        if (res.results.data) {
          setIdeas(res.results.data);
        }
        if (!filtering) {
          handleListTag();
        }
      })
      .catch(() => setFetching(false));
  };

  useEffect(() => {
    if (sort.length > 0) {
      handleListFeedback(filtering);
    }
  }, [sort, status, filterTags.length, title]);

  useEffect(() => {
    if (tags) {
      if (selectedIdea) {
        getFeedback(selectedIdea.id);
      }
      handleListFeedback(true);
      setSocketTags(false);
    }
  }, [tags]);

  return (
    <>
      <PageHeader
        buttonLabel="New Idea"
        header="Upvotes"
        showButtonIcon={true}
        disabled={
          (!is_public && !permissions?.includes(Permissions.ADD_IDEA)) ||
          permissions?.length === 0
        }
        pageContainerClass="max-w-[1200px] mx-auto pt-8 px-6"
      />
      <UpvoteFilters roadmaps={roadmaps} />
      <div id="UpVoteList">
        {(!ideas || (ideas && ideas.length === 0 && !filtering)) &&
          fetching && (
            <div style={{ paddingTop: '50px' }}>
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
        {ideas && (
          <>
            {(ideas.length === 0 || (is_public && permissions?.length === 0)) &&
              !fetching && (
                <ListDiv>
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
                        {!filtering ||
                        (is_public && permissions?.length === 0) ? (
                          <div className="container no-upvote-background">
                            <div className="sad-face">
                              <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
                            </div>
                            <h3 className="no-upvote-header">
                              {is_public && permissions?.length === 0
                                ? 'This public board is no longer available. Please contact the admin.'
                                : 'No ideas have been created… yet.'}
                            </h3>
                            {(!is_public ||
                              (permissions && permissions?.length > 0)) && (
                              <h4 className="no-upvote-sub">
                                Now is a great time to add your first idea.
                              </h4>
                            )}
                          </div>
                        ) : (
                          'Crickets and tumbleweeds. Please try again.'
                        )}
                      </h4>
                    </div>
                  </div>
                </ListDiv>
              )}
            {ideas.length > 0 &&
              (!is_public ||
                (is_public && permissions && permissions?.length > 0)) && (
                <div className="upvote-each-list-container">
                  {ideas.find((idea) => idea.pinned) && (
                    <p className="pinned-label">
                      Pinned idea
                      {ideas.filter((idea) => idea.pinned).length > 1
                        ? 's'
                        : ''}
                    </p>
                  )}
                  {ideas
                    ?.filter((idea) => !idea.draft)
                    .map((idea, idx) => (
                      <Fragment key={idx}>
                        <UpVoteEachList
                          props={idea}
                          handleListFeedback={handleListFeedback}
                        />
                        {ideas.find((idea) => idea.pinned) &&
                          idea.pinned &&
                          ideas.length - 1 > idx &&
                          !ideas[idx + 1].pinned && <hr />}
                      </Fragment>
                    ))}
                </div>
              )}
          </>
        )}
      </div>
      <AddYourBoardModal open={remindAddBoard ?? false} />
    </>
  );
}
