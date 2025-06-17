import { useApp } from '../../contexts/AppContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { DropdownRoadmap } from '../DropDownRoadmap';
import './styles.css';
import * as React from 'react';

export const RoadmapFilter = () => {
  const { is_public } = useApp();
  const {
    state: { filter, tags },
    setFilter,
  } = useFeedback();
  const { tags: filterTags, title } = filter;

  return (
    <DropdownRoadmap
      content={
        <React.Fragment>
          <div className="control right-input-field">
            <input
              className="input right-filter-field"
              id="RightFilterField"
              name="RightFilterField"
              readOnly={true}
              style={{
                color: '#888399',
                fontFamily: 'Satoshi-Variable',
                fontSize: '15px',
                fontWeight: 500,
              }}
              type="text"
              value="Filter by tags"
            />
          </div>
          <div
            style={{
              maxHeight: '290px',
              overflowY: 'auto',
              width: '100%',
            }}
          >
            <div
              className={`drop-down-status${
                tags.length > 0 ? '' : ' is-hidden'
              }`}
            >
              <span className="drop-down-label">Tags</span>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
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
                      filtering:
                        copy_active_tags.length > 0 || title.length > 0,
                      tags: copy_active_tags,
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-hash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
                  </svg>
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
        </React.Fragment>
      }
      label={
        <React.Fragment>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter"
            style={{ marginRight: 8 }}
            viewBox="0 0 16 16"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
          Filter
        </React.Fragment>
      }
      container_class="right-filter"
      content_class="dropdown-content"
      content_container_class="dropdown-menu"
      label_class={`right-drop-down-button border-0 ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
    />
  );
};
