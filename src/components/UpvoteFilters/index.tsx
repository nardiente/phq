import './styles.css';
import { UpvoteFiltersProps } from './types';
import { useFeedback } from '../../contexts/FeedbackContext';
import { Dropdown } from '../DropDown';
import { ChevronDownIcon } from '../icons/chevron-down.icon';
import { Fragment, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

export const UpvoteFilters: React.FC<UpvoteFiltersProps> = (props) => {
  const { is_public } = useApp();
  const {
    state: { filter, tags: feedbackTags },
    setFilter,
  } = useFeedback();
  const { sort, status, tags, title } = filter;

  const [search, setSearch] = useState<string>(title);

  const handleUpvoteSearch = () => {
    setFilter({
      ...filter,
      filtering: true,
      title: search,
    });
  };

  const handleUpvoteSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      return;
    }
    setFilter({
      ...filter,
      filtering: true,
      title: value,
    });
  };

  const onFilterStatus = (status: string) => {
    setFilter({
      ...filter,
      filtering:
        sort !== 'Newest' ||
        status.length > 0 ||
        tags.length > 0 ||
        title.length > 0,
      status,
    });
  };

  const onFilterTags = (tags: string[]) => {
    setFilter({
      ...filter,
      filtering:
        sort !== 'Newest' ||
        status.length > 0 ||
        tags.length > 0 ||
        title.length > 0,
      tags,
    });
  };

  const onSort = (sort: string) => {
    setFilter({
      ...filter,
      filtering:
        sort !== 'Newest' ||
        status.length > 0 ||
        tags.length > 0 ||
        title.length > 0,
      sort,
    });
  };

  return (
    <div id="UpvoteFilter">
      <div className="upvote-container">
        <div className="sort">
          <Dropdown
            content={
              <Fragment>
                <span
                  onClick={() => onSort('Newest')}
                  className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                >
                  Newest
                </span>
                <span
                  onClick={() => onSort('Trending')}
                  className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                >
                  Trending
                </span>
                <span
                  onClick={() => onSort('Oldest')}
                  className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                >
                  Oldest
                </span>
                <span
                  onClick={() => onSort('Most Comments')}
                  className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                >
                  Most Comments
                </span>
                <span
                  onClick={() => onSort('Most Votes')}
                  className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                >
                  Most Votes
                </span>
              </Fragment>
            }
            label={
              <Fragment>
                <span
                  className={`for-dropdown ${is_public ? 'default-text-color' : 'text-[#09041a]'}`}
                >
                  {filter.sort}
                </span>
                <span className="icon is-small" style={{ marginTop: '2px' }}>
                  <ChevronDownIcon />
                </span>
              </Fragment>
            }
            content_class="dropdown-content"
            content_container_class=""
            label_class="drop-down-button"
          />
        </div>
        <div className="search">
          <div className="control has-icons-right input-field">
            <input
              id="search-field"
              className="input"
              onChange={(e) => handleUpvoteSearchChange(e)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleUpvoteSearch();
                }
              }}
              placeholder="Search ideas"
              type="text"
              value={search}
            />
            <span className="icon is-right">
              <figure className="image is-16x16">
                <img
                  onClick={() => handleUpvoteSearch()}
                  src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/search.svg"
                />
              </figure>
            </span>
          </div>
        </div>
        <hr />
        <div className="filter">
          <Dropdown
            content={
              <Fragment>
                <div className="control right-input-field">
                  <input
                    className="input right-filter-field"
                    id="RightFilterField"
                    name="RightFilterField"
                    readOnly={true}
                    type="text"
                    value="Filter by status or tags"
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
                      props.roadmaps.length === 0 ? ' is-hidden' : ''
                    }`}
                  >
                    <span className="drop-down-label">Status</span>
                    {props.roadmaps.map((roadmap, idx) => (
                      <span
                        key={idx}
                        className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                        onClick={() =>
                          onFilterStatus(
                            roadmap.name === filter.status ? '' : roadmap.name
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-dot"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        </svg>
                        {roadmap.name}
                        <span
                          className={`selected${
                            filter.status === roadmap.name ? '' : ' is-hidden'
                          }`}
                        >
                          <figure className="image is-16x16">
                            <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/check.svg" />
                          </figure>
                        </span>
                      </span>
                    ))}
                  </div>
                  <div
                    className={
                      props.roadmaps.length === 0 || feedbackTags.length === 0
                        ? 'is-hidden'
                        : ''
                    }
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      paddingTop: '8px',
                      width: '100%',
                    }}
                  >
                    <hr
                      style={{
                        background: '#E1E0E5',
                        height: '1px',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div
                    className={`drop-down-status${
                      feedbackTags.length > 0 ? '' : ' is-hidden'
                    }`}
                  >
                    <span className="drop-down-label">Tags</span>
                    {feedbackTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`dropdown-item is-clickable drop-down-font ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
                        onClick={() => {
                          let copy_active_tags = tags;
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
                          onFilterTags(copy_active_tags);
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
                            tags.find((active_tag) => active_tag === tag.tag)
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
              </Fragment>
            }
            label={
              <Fragment>
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
              </Fragment>
            }
            container_class="right-filter"
            content_class="dropdown-content"
            content_container_class="dropdown-menu"
            label_class={`right-drop-down-button ${is_public ? 'default-text-color' : 'text-[#110733]'}`}
          />
        </div>
      </div>
    </div>
  );
};
