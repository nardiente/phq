import { useEffect, useRef, useState } from 'react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { usePanel } from '../../../contexts/PanelContext';

export const RoadmapHeader = () => {
  const ref = useRef<HTMLElement>();

  const {
    state: { filter, tags },
    setFilter,
  } = useFeedback();
  const { tags: filterTags } = filter;
  const { setIsOpen } = usePanel();

  const [is_expanded, setExpanded] = useState(false);

  useEffect(() => {
    const expand = (e: any) => {
      if (
        !ref.current ||
        (!ref.current.contains(e.target) &&
          !e.target.classList.contains('panel-container'))
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', expand);
    return () => {
      document.removeEventListener('mousedown', expand);
    };
  }, []);

  const toggle = () => setExpanded(!is_expanded);

  return (
    <div
      className="flex justify-between items-center mb-4"
      ref={ref as React.LegacyRef<HTMLDivElement>}
    >
      <div className="relative text-gray-900">
        <button
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md"
          onClick={toggle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
          </svg>
          Filter
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {is_expanded && (
          <div
            aria-hidden={!is_expanded}
            className={`z-10 dropdown-menu ${is_expanded ? 'block' : ''}`}
            id="dropdown-menu"
            onClick={toggle}
            role="menu"
          >
            <div className="dropdown-content rounded">
              {tags.map((tag) => (
                <span
                  className="dropdown-item is-clickable drop-down-font text-[#110733]"
                  onClick={() => {
                    let copy_active_tags = filterTags;
                    if (
                      copy_active_tags.find(
                        (active_tag) => active_tag === tag.tag
                      )
                    ) {
                      copy_active_tags = copy_active_tags.filter(
                        (active_tag) => active_tag !== tag.tag
                      );
                    } else {
                      copy_active_tags.push(tag.tag);
                    }
                    setFilter({
                      ...filter,
                      filtering: copy_active_tags.length > 0,
                      tags: copy_active_tags,
                    });
                  }}
                >
                  {tag.tag}
                  <span
                    className={`selected${
                      filterTags.find((active_tag) => active_tag === tag.tag)
                        ? ''
                        : ' is-hidden'
                    }`}
                  >
                    <figure className="image is-16x16">
                      <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/check.svg" />
                    </figure>
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        className="px-4 py-2 bg-[#FF6334] text-white rounded-md font-medium"
        onClick={() => setIsOpen(true)}
      >
        + Add an Idea
      </button>
    </div>
  );
};
