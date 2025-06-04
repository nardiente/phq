import { useEffect, useRef, useState } from 'react';
import { useFeedback } from '../../../../contexts/FeedbackContext';
import { useUser } from '../../../../contexts/UserContext';
import './styles.css';
import { putApi } from '../../../../utils/api/api';
import { Permissions, RbacPermissions } from '../../../../types/common';
import { CheckIcon } from '../../../icons/check.icon';
import { Roadmap, RoadmapColor } from '../../../../types/roadmap';
import { usePanel } from '../../../../contexts/PanelContext';
import { useSocket } from '../../../../contexts/SocketContext';
import { SocketAction } from '../../../../types/socket';

const ColumnOptionDropdown = ({
  roadmap,
  roadmapColors,
}: {
  roadmap: Roadmap;
  roadmapColors: RoadmapColor[];
}) => {
  const columnDivRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();
  const {
    state: { filter, roadmaps },
    updateRoadmap,
  } = useFeedback();
  const { setActivePage, setDeleteId, setDeleteType, setIsOpen } = usePanel();
  const {
    state: { socket },
  } = useSocket();

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        columnDivRef.current &&
        !columnDivRef.current.contains(event.target) &&
        event.target !== document.body
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    setShowOptions(false);
    setDeleteType('column');
    setDeleteId(roadmap.id);
    setActivePage('delete');
    setIsOpen(true);
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
          upvote.feedback_tags?.some((feedbackTag) => {
            const tag = feedbackTag.tag;
            return tag && filterTagLower.includes(tag.tag.toLowerCase());
          });

        return titleMatch && tagMatch;
      }) || [];

    const dataWithFilteredUpvotes = { ...data, upvotes: filteredUpvotes };

    return dataWithFilteredUpvotes;
  };

  const handleChangeColor = (color: number) => {
    setLoading(true);
    putApi(`roadmaps/${roadmap.id}`, {
      name: roadmap.name,
      sort_order: roadmap?.sort_order,
      roadmap_color_id: color,
    }).then((res) => {
      setLoading(false);
      if (res.results.data) {
        updateRoadmap(handleFilterData(res.results.data));
        setShowOptions(false);
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

  return (
    <div ref={columnDivRef} id="ColumnDropdown">
      <button
        className="option-button"
        type="button"
        onClick={() => setShowOptions((prev) => !prev)}
        disabled={!user?.permissions.includes(Permissions.EDIT_COLUMN)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </button>
      {showOptions && (
        <div className="options">
          {user?.rbac_permissions.includes(
            RbacPermissions.ADD_DELETE_COLUMNS
          ) && (
            <>
              <button
                className="delete-button"
                type="button"
                onClick={handleDelete}
                disabled={loading || roadmaps?.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
                Delete
              </button>
              <hr />
            </>
          )}

          <span>Colors</span>
          <div>
            {roadmapColors.map((color) => (
              <button
                key={color.id}
                className="color-button"
                type="button"
                onClick={() => handleChangeColor(color.id)}
                disabled={loading}
              >
                <div>
                  <svg
                    style={{ color: color.background_color }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  {color.name}
                </div>
                {roadmap.roadmap_color_id == color.id && <CheckIcon />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnOptionDropdown;
