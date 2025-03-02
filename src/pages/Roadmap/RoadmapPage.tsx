import './styles.css';
import { Roadmap, Tag } from './types';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { UpvoteComponent } from './UpvoteComponent';
import { getApi, postApi, putApi } from '../../utils/api/api';
import { Feedback, FeedbackTag } from '../../types/feedback';
import { FadeLoader } from 'react-spinners';
import ColumnInput from '../../components/ui/column_input/ColumnInput';
import ColumnOptionDropdown from '../../components/ui/dropdown/column_option_dropdown/ColumnOptionDropdown';
import { RoadmapColor } from '../../types/roadmap';
import { Permissions, RbacPermissions } from '../../types/common';
import { AddYourBoardModal } from '../../components/AddYourBoardModal';
import { PlusIcon } from '../../components/icons/plus.icon';
import moment from 'moment';
import { useUser } from '../../contexts/UserContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useSocket } from '../../contexts/SocketContext';
import { usePanel } from '../../contexts/PanelContext';
import { getKaslKey } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import { RoadmapFilter } from '../../components/RoadmapFilter';
import Button from '../../components/Button';
import { Plus } from 'lucide-react';

export function RoadmapPage() {
  const { user } = useUser();
  const { moderation, permissions, rbac_permissions } = user ?? {};
  const {
    state: { filter, roadmaps, selectedIdea, tags },
    setFilterTitle,
    addRoadmap,
    setRoadmaps,
    setSelectedIdea,
    setTags,
    updateIdea,
    updateIdeaInRoadmap,
    updateRoadmap,
  } = useFeedback();
  const {
    state: { socket, tags: socketTags },
    setSocketTags,
  } = useSocket();
  const { tags: filterTag, title } = filter;
  const { setActivePage, setActiveTab, setIsOpen } = usePanel();

  const [fetching, setFetching] = useState<boolean>(true);
  const [editColumnNameId, setEditColumnNameId] = useState<number>(0);
  const [columnName, setColumnName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [roadmapColors, setRoadmapColors] = useState<RoadmapColor[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const is_logged_in = getKaslKey() !== undefined;
  const isRestricted =
    !fetching && is_public && permissions && permissions.length === 0;

  const getFeedback = (id: number) => {
    getApi<Feedback>({ url: `feedback/${id}` }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        updateIdea(data);
        updateIdeaInRoadmap(data.status_id ?? 0, data);
        setSelectedIdea(data);
        setActivePage('add_comment');
        setIsOpen(true);
        socket?.emit('message', {
          action: 'updateIdea',
          data: { user_id: user?.user?.id, projectId: user?.project?.id },
        });
      }
    });
  };

  const handleListTag = () => {
    getApi<Tag[]>({
      url: 'tags',
      params: is_public ? { domain: window.location.host } : undefined,
      useCustomerKey: moderation?.user_login === true && is_public,
    }).then((res) => {
      if (res.results.data) {
        setTags(res.results.data);
      }
    });
  };

  const handleGetStatus = () => {
    const url = is_public
      ? `roadmaps/upvotes/${window.location.host}`
      : 'roadmaps/upvotes';

    setFetching(true);
    getApi<Roadmap[]>({
      url,
      params: { tags: filterTag.join(','), title },
      useSessionToken: is_public && moderation?.user_login === true,
    })
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          setRoadmaps(data);

          const ideas: Feedback[] = [];
          data.forEach((roadmap) => {
            roadmap.upvotes?.forEach((upvote) => {
              if (upvote.created_at) {
                const createdAtDate = new Date(upvote.created_at);
                ideas.push({ ...upvote, created_at: createdAtDate });
              }
            });
          });

          // Sorting ideas by created_at date (Newest first)
          ideas.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date();
            const dateB = b.created_at ? new Date(b.created_at) : new Date();
            return dateB.getTime() - dateA.getTime();
          });
        }
        if (!tags || tags.length === 0) {
          handleListTag();
        }
      })
      .catch(() => setFetching(false))
      .finally(() => setFetching(false));
  };

  const handleFilterData = (data: Roadmap) => {
    if (!filter.title && !filter.tags.length) {
      return data;
    }

    const filterTitleLower = filter.title.toLowerCase();
    const filterTagLower = filter.tags.map((tag) => tag.toLowerCase());

    const filteredUpvotes =
      data.upvotes?.filter((upvote) => {
        const titleMatch =
          !filterTitleLower ||
          upvote.title?.toLowerCase().includes(filterTitleLower);

        const tagMatch =
          !filterTagLower.length ||
          upvote.feedback_tags?.some((feedbackTag: FeedbackTag) => {
            const tag = feedbackTag.tag;
            return tag && filterTagLower.includes(tag.tag.toLowerCase());
          });

        return titleMatch && tagMatch;
      }) || [];

    const dataWithFilteredUpvotes = { ...data, upvotes: filteredUpvotes };

    return dataWithFilteredUpvotes;
  };
  const handleFilterRoadmaps = (data: Roadmap[]) => {
    if (!filter.title && !filter.tags.length) {
      return data;
    }

    const filterTitleLower = filter.title.toLowerCase();
    const filterTagLower = filter.tags.map((tag) => tag.toLowerCase());

    const filteredRoadmaps = data.map((roadmap) => {
      const filteredUpvotes =
        roadmap.upvotes?.filter((upvote) => {
          const titleMatch =
            !filterTitleLower ||
            upvote.title?.toLowerCase().includes(filterTitleLower);

          const tagMatch =
            !filterTagLower.length ||
            upvote.feedback_tags?.some((feedbackTag: FeedbackTag) => {
              const tag = feedbackTag.tag;
              return tag && filterTagLower.includes(tag.tag.toLowerCase());
            });

          return titleMatch && tagMatch;
        }) || [];

      return { ...roadmap, upvotes: filteredUpvotes };
    });

    return filteredRoadmaps;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    let { draggableId } = result;
    draggableId = draggableId.split('-')[1];
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      draggableId == ''
    ) {
      return;
    }

    if (type === 'column' && destination.index < (roadmaps?.length ?? 0)) {
      const roadmap = roadmaps?.find(
        (roadmap) => roadmap.id == Number(draggableId)
      );
      if (roadmap) {
        const new_roadmaps = roadmaps;
        new_roadmaps?.splice(source.index, 1);
        new_roadmaps?.splice(destination.index, 0, roadmap);
        setRoadmaps(new_roadmaps ?? []);
        const ids = roadmaps
          ?.filter((roadmap) => roadmap.id !== 0)
          .map((roadmap) => roadmap.id);
        setDragging(true);
        putApi<Roadmap[]>('roadmaps/re-sort', { ids }).then((res) => {
          if (res.results.data) {
            setRoadmaps(handleFilterRoadmaps(res.results.data));
          }
          setDragging(false);
        });
      }
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      const new_roadmaps = roadmaps?.map((roadmap) => {
        const draggable = roadmap.upvotes?.find(
          (upvote) => upvote.id == Number(draggableId)
        );
        if (roadmap.id === Number(source.droppableId) && draggable) {
          const newUpvotes = roadmap?.upvotes;
          newUpvotes?.splice(source.index, 1);
          newUpvotes?.splice(destination.index, 0, draggable);
          roadmap.upvotes = newUpvotes;
        }
        return roadmap;
      }) as Roadmap[];
      setRoadmaps(new_roadmaps);
      const roadmap = new_roadmaps?.find(
        (new_roadmap) => new_roadmap.id === Number(start)
      );
      if (roadmap && roadmap.upvotes) {
        const ids = roadmap.upvotes
          .filter((upvote) => upvote.id !== 0)
          .map((upvote) => upvote.id ?? 0);
        setDragging(true);
        putApi<Roadmap>('feedback/re-index', {
          ids,
          status_id: roadmap.id,
        }).then((res) => {
          if (res.results.data) {
            const data = res.results.data;
            updateRoadmap(handleFilterData(data));
          }
          setDragging(false);
        });
      }

      return;
    }

    let draggable = { vote: 0, title: '', id: 0 } as Feedback;

    setRoadmaps(
      roadmaps?.map((roadmap) => {
        draggable =
          roadmap.upvotes?.find(
            (upvote) => upvote.id === Number(draggableId)
          ) || draggable;
        if (roadmap.id === Number(source.droppableId)) {
          const newUpvotes = roadmap?.upvotes;
          newUpvotes?.splice(source.index, 1);
          roadmap.upvotes = newUpvotes;
        }
        return roadmap;
      }) ?? []
    );

    const new_roadmaps = roadmaps?.map((roadmap) => {
      if (roadmap.id === Number(destination.droppableId)) {
        const newUpvotes = roadmap?.upvotes;
        newUpvotes?.splice(destination.index, 0, draggable);
        roadmap.upvotes = newUpvotes;
      }
      return roadmap;
    });
    setRoadmaps(new_roadmaps ?? []);
    const roadmap_destination = new_roadmaps?.find(
      (new_roadmap) => new_roadmap.id === Number(finish)
    );
    if (roadmap_destination && roadmap_destination.upvotes) {
      const ids = roadmap_destination.upvotes
        .filter((upvote) => upvote.id !== 0)
        .map((upvote) => upvote.id ?? 0);
      setDragging(true);
      putApi<Roadmap>('feedback/re-index', {
        ids,
        status_id: roadmap_destination.id,
      }).then((res) => {
        if (res.results.data) {
          const data = res.results.data;
          const idea =
            data.upvotes?.find((upvote) => upvote.id === Number(draggableId)) ||
            draggable;
          updateRoadmap(handleFilterData(data));
          updateIdea(idea);
        }
        setDragging(false);
      });
    }
  };

  const handleAddColumn = () => {
    setLoading(true);
    postApi({ url: 'roadmaps', payload: { name: columnName } }).then((res) => {
      setLoading(false);
      if (res.results.data) {
        addRoadmap(res.results.data);
        setEditColumnNameId(0);
      }
    });
  };

  const handleUpdateColumn = () => {
    setLoading(true);
    const roadmap = roadmaps?.find(
      (roadmap) => roadmap.id === editColumnNameId
    );
    if (!roadmap) return;
    putApi<Roadmap>(`roadmaps/${editColumnNameId}`, {
      name: columnName || '',
      sort_order: roadmap?.sort_order,
      roadmap_color_id: roadmap?.roadmap_color_id,
    }).then((res) => {
      setLoading(false);
      if (res.results.data) {
        updateRoadmap(handleFilterData(res.results.data));

        setEditColumnNameId(0);
      }
    });
  };

  const handleGetRoadmapColors = () => {
    getApi<RoadmapColor[]>({ url: 'roadmaps/colors' }).then((res) => {
      if (res.results.data) {
        setRoadmapColors(res.results.data);
      }
    });
  };

  useEffect(() => {
    setActiveTab('/roadmap');
    if (is_logged_in) {
      handleGetRoadmapColors();
    }
  }, []);

  useEffect(() => {
    handleGetStatus();
  }, [filter]);

  useEffect(() => {
    if (socketTags) {
      if (selectedIdea?.id) {
        getFeedback(selectedIdea.id);
      }
      handleGetStatus();
      setSocketTags(false);
    }
  }, [socketTags]);

  return (
    <Settings className="pb-0">
      <SettingsHeader
        title="Roadmap"
        filter={
          <div className="flex gap-8">
            <div id="RoadmapFilter" className="search">
              <div className="control has-icons-right input-field">
                <input
                  id="search-field"
                  className="input border-t-0 border-r-0 border-l-0 rounded-none border-[#c5c5da] bg-transparent text-[#3d3d5e] p-2 shadow-none"
                  onChange={(e) => setFilterTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      setFilterTitle(title);
                    }
                  }}
                  placeholder="Search ideas"
                  type="text"
                  value={title}
                />
                <span className="icon is-right">
                  <figure className="image is-16x16">
                    <img
                      onClick={() => setFilterTitle(title)}
                      src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/search.svg"
                    />
                  </figure>
                </span>
              </div>
            </div>
            <RoadmapFilter />
          </div>
        }
        primaryButton={
          <Button
            text={
              <>
                <Plus size={16} />
                New Idea
              </>
            }
            disabled={
              (!is_public && !permissions?.includes(Permissions.ADD_IDEA)) ||
              permissions?.length === 0
            }
            onClick={() => setIsOpen(true)}
          />
        }
      />
      {fetching &&
        (!roadmaps ||
          roadmaps?.every((r) => !r.upvotes || r.upvotes.length === 0)) && (
          <div className="flex justify-center items-center">
            <FadeLoader height={5} width={2} radius={2} margin={-10} />
          </div>
        )}
      <div
        id="RoadmapPublicView"
        className={isRestricted ? 'flex justify-center' : ''}
      >
        <div className="pt-8 w-[75vw]">
          {isRestricted ? (
            <div className="container no-roadmap-background">
              <div className="flex justify-center mb-2 sad-face">
                <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
              </div>
              <h3 className="no-roadmap-header">
                This public board is no longer available. Please contact the
                admin.
              </h3>
            </div>
          ) : (
            <>
              {!fetching && (!roadmaps || roadmaps.length === 0) && (
                <>
                  <div className="container no-roadmap-background">
                    {filterTag.length === 0 && title.length === 0 ? (
                      <>
                        <div className="flex justify-center mb-2 sad-face">
                          <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/emoji-frown.svg"></img>
                        </div>
                        <h3 className="no-roadmap-header">
                          {is_public && permissions && permissions.length === 0
                            ? 'This public board is no longer available. Please contact the admin.'
                            : 'No upvotes have been created… yet.'}
                        </h3>
                        {!is_public &&
                          permissions &&
                          permissions.length > 0 && (
                            <h4 className="no-roadmap-sub">
                              Now is a great time to add your first entry!
                            </h4>
                          )}
                      </>
                    ) : (
                      'Crickets and tumbleweeds. Please try again.'
                    )}
                  </div>
                </>
              )}
              {roadmaps &&
                roadmaps.length > 0 &&
                (!is_public ||
                  (is_public && permissions && permissions.length > 0)) && (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                      droppableId="all-columns"
                      direction="horizontal"
                      type="column"
                    >
                      {(provided) => (
                        /* Container */
                        <div ref={provided.innerRef} className="flex gap-6">
                          {(roadmaps as Roadmap[]).map((roadmap, idx) => (
                            <Draggable
                              draggableId={`roadmap-${roadmap.id.toString()}`}
                              key={roadmap.id}
                              index={idx}
                              isDragDisabled={
                                is_public ||
                                !permissions?.includes(
                                  Permissions.DRAG_COLUMN
                                ) ||
                                dragging ||
                                fetching ||
                                !rbac_permissions?.includes(
                                  RbacPermissions.CHANGE_ORDER_COLUMNS
                                )
                              }
                            >
                              {(provided) => (
                                <div
                                  className="bg-[#fafafa]"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    style={{
                                      position: 'relative',
                                      width: '380px',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      marginBottom: '16px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        background: `${roadmap.background_color}`,
                                        borderRadius: '5px',
                                        padding: '8px 10px 8px 10px',
                                      }}
                                    >
                                      <span
                                        className="roadmap-pf"
                                        style={{
                                          cursor:
                                            !is_public &&
                                            permissions?.includes(
                                              Permissions.EDIT_COLUMN
                                            ) &&
                                            rbac_permissions?.includes(
                                              RbacPermissions.CHANGE_COLUMN_NAMES
                                            )
                                              ? 'pointer'
                                              : '',
                                        }}
                                        onClick={() => {
                                          if (
                                            !is_public &&
                                            permissions?.includes(
                                              Permissions.EDIT_COLUMN
                                            ) &&
                                            rbac_permissions?.includes(
                                              RbacPermissions.CHANGE_COLUMN_NAMES
                                            )
                                          ) {
                                            setEditColumnNameId(roadmap.id);
                                            setColumnName(roadmap.name);
                                          }
                                        }}
                                      >
                                        {roadmap.name}
                                      </span>
                                      {editColumnNameId == roadmap.id &&
                                        rbac_permissions?.includes(
                                          RbacPermissions.CHANGE_COLUMN_NAMES
                                        ) && (
                                          <ColumnInput
                                            value={columnName}
                                            setEditColumnNameId={
                                              setEditColumnNameId
                                            }
                                            setColumnName={setColumnName}
                                            handleConfirm={handleUpdateColumn}
                                            disable={loading}
                                          />
                                        )}
                                    </div>
                                    {!is_public && (
                                      <ColumnOptionDropdown
                                        roadmap={roadmap}
                                        roadmapColors={roadmapColors}
                                      />
                                    )}
                                  </div>
                                  <Droppable
                                    droppableId={roadmap.id.toString()}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        className="idea-list-container"
                                      >
                                        {roadmap.upvotes
                                          ?.filter(
                                            (upvote) =>
                                              !upvote.draft &&
                                              !upvote.hide_on_roadmap
                                          )
                                          .map((upvote, idx) => {
                                            return (
                                              <Draggable
                                                draggableId={`idea-${upvote.id?.toString()}`}
                                                key={upvote.id}
                                                index={idx}
                                                isDragDisabled={
                                                  is_public ||
                                                  !permissions?.includes(
                                                    Permissions.DRAG_IDEA
                                                  ) ||
                                                  upvote.not_administer ||
                                                  dragging ||
                                                  fetching ||
                                                  !rbac_permissions?.includes(
                                                    RbacPermissions.CHANGE_UPVOTE_PRIORITISATION_ROADMAP
                                                  )
                                                }
                                              >
                                                {(provided) => (
                                                  <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                  >
                                                    <UpvoteComponent
                                                      upvote={upvote}
                                                    />
                                                  </div>
                                                )}
                                              </Draggable>
                                            );
                                          })}
                                        {roadmap.upvotes?.filter(
                                          (upvote) =>
                                            !upvote.draft &&
                                            !upvote.hide_on_roadmap
                                        ).length === 0 && (
                                          <div className="empty-message">
                                            Empty
                                          </div>
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {!is_public && (
                            <div className="add-column-btn-container">
                              {rbac_permissions?.includes(
                                RbacPermissions.ADD_DELETE_COLUMNS
                              ) && (
                                <>
                                  <button
                                    className="add-column-btn w-[380px] flex"
                                    onClick={() => {
                                      if (!is_public) {
                                        setEditColumnNameId(-1);
                                        setColumnName('');
                                      }
                                    }}
                                    disabled={
                                      !permissions?.includes(
                                        Permissions.ADD_COLUMN
                                      )
                                    }
                                  >
                                    <PlusIcon />
                                    Add Column
                                  </button>
                                  {editColumnNameId == -1 && (
                                    <ColumnInput
                                      value={columnName}
                                      setEditColumnNameId={setEditColumnNameId}
                                      setColumnName={setColumnName}
                                      handleConfirm={handleAddColumn}
                                      disable={loading}
                                      isAddColumn={true}
                                    />
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
            </>
          )}
        </div>
      </div>
      <AddYourBoardModal
        open={
          (!is_public &&
            user?.project !== undefined &&
            user.user &&
            !user.user.stop_remind_add_board &&
            (!user.user.remind_3_days ||
              (user.user.remind_3_days &&
                moment().diff(
                  moment(user.user?.remind_3_days_timestamp),
                  'minutes'
                ) >= 4320))) ??
          false
        }
      />
    </Settings>
  );
}
