import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { useState } from 'react';
import { postApi, putApi } from '../../../utils/api/api';
import { Roadmap } from '../../../types/roadmap';
import { Feedback } from '../../../types/feedback';
import { useSocket } from '../../../contexts/SocketContext';
import { SocketAction } from '../../../types/socket';
import { useUser } from '../../../contexts/UserContext';
import { Permissions, RbacPermissions } from '../../../types/common';
import ColumnInput from '../../ui/column_input/ColumnInput';
import ColumnOptionDropdown from '../../ui/dropdown/column_option_dropdown/ColumnOptionDropdown';
import { useApp } from '../../../contexts/AppContext';
import { UpvoteComponent } from '../../../pages/Roadmap/UpvoteComponent';
import { PlusIcon } from '../../icons/plus.icon';
import '../../../../src/pages/Roadmap/styles.css';

export const RoadmapList = () => {
  const { is_public } = useApp();
  const {
    state: { listing, roadmaps },
    addRoadmap,
    handleFilterData,
    handleFilterRoadmaps,
    setRoadmaps,
    updateIdea,
    updateRoadmap,
  } = useFeedback();
  const {
    state: { socket },
  } = useSocket();
  const { user } = useUser();
  const { permissions, rbac_permissions } = user ?? {};
  const { roadmap_colors } = useApp();

  const [columnName, setColumnName] = useState<string>('');
  const [dragging, setDragging] = useState<boolean>(false);
  const [editColumnNameId, setEditColumnNameId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddColumn = () => {
    setLoading(true);
    postApi({ url: 'roadmaps', payload: { name: columnName } }).then((res) => {
      setLoading(false);
      if (res.results.data) {
        addRoadmap(res.results.data);
        setEditColumnNameId(0);
        socket?.emit('message', {
          action: SocketAction.ADD_ROADMAP,
          data: {
            roadmap: res.results.data,
            user_id: user?.user?.id,
            projectId: user?.project?.id,
          },
        });
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
        socket?.emit('message', {
          action: SocketAction.UPDATE_ROADMAP,
          data: {
            roadmap: handleFilterData(res.results.data),
            user_id: user?.user?.id,
            projectId: user?.project?.id,
          },
        });
      }
    });
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
            socket?.emit('message', {
              action: SocketAction.UPDATE_ROADMAP,
              data: {
                roadmap: handleFilterRoadmaps(res.results.data),
                user_id: user?.user?.id,
                projectId: user?.project?.id,
              },
            });
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
            socket?.emit('message', {
              action: SocketAction.UPDATE_ROADMAP,
              data: {
                user_id: user?.user?.id,
                projectId: user?.project?.id,
                roadmap: handleFilterData(data),
              },
            });
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
          socket?.emit('message', {
            action: SocketAction.UPDATE_IDEA,
            data: {
              idea,
              user_id: user?.user?.id,
              projectId: user?.project?.id,
            },
          });
          socket?.emit('message', {
            action: SocketAction.UPDATE_ROADMAP,
            data: {
              projectId: user?.project?.id,
              roadmap: handleFilterData(data),
            },
          });
        }
        setDragging(false);
      });
    }
  };

  return (
    <div id="RoadmapPublicView" style={{ height: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            /* Container */
            <div ref={provided.innerRef} className="flex gap-6">
              {roadmaps.map((roadmap, idx) => (
                <Draggable
                  draggableId={`roadmap-${roadmap.id.toString()}`}
                  key={roadmap.id}
                  index={idx}
                  isDragDisabled={
                    is_public ||
                    !permissions?.includes(Permissions.DRAG_COLUMN) ||
                    dragging ||
                    listing ||
                    !rbac_permissions?.includes(
                      RbacPermissions.CHANGE_ORDER_COLUMNS
                    )
                  }
                >
                  {(provided) => (
                    <div
                      className="bg-[#fafafa] rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        style={{
                          position: 'relative',
                          width: '416px',
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
                                setEditColumnNameId={setEditColumnNameId}
                                setColumnName={setColumnName}
                                handleConfirm={handleUpdateColumn}
                                disable={loading}
                              />
                            )}
                        </div>
                        {!is_public && (
                          <ColumnOptionDropdown
                            roadmap={roadmap}
                            roadmapColors={roadmap_colors}
                          />
                        )}
                      </div>
                      <Droppable droppableId={roadmap.id.toString()}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            className="idea-list-container"
                          >
                            {roadmap.upvotes
                              ?.sort((a, b) => a.index - b.index)
                              .filter(
                                (upvote) =>
                                  !upvote.draft && !upvote.hide_on_roadmap
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
                                      listing ||
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
                                        <UpvoteComponent upvote={upvote} />
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {roadmap.upvotes?.filter(
                              (upvote) =>
                                !upvote.draft && !upvote.hide_on_roadmap
                            ).length === 0 && (
                              <div className="empty-message">Empty</div>
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
                          !permissions?.includes(Permissions.ADD_COLUMN)
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
    </div>
  );
};
