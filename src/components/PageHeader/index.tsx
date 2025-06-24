import './styles.css';
import * as React from 'react';
import { PageHeaderProps } from './types';
import { RoadmapFilter } from '../RoadmapFilter';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { WhatsNewFilter } from '../WhatsNewFilter';
import { RbacPermissions } from '../../types/common';
import { PlusIcon } from '../icons/plus.icon';
import { useApp } from '../../contexts/AppContext';
import { isTeamMember } from '../../utils/user';

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { active_tab },
    setIsOpen,
  } = usePanel();
  const {
    state: { filter },
    setFilter,
  } = useFeedback();

  const has_new_idea_button =
    active_tab === '/upvotes' || active_tab === '/roadmap';
  const is_member = isTeamMember(user?.user);

  const [title, setTitle] = React.useState<string>('');

  return (
    <div
      className={`max-h-screen ${is_public ? 'background-color' : 'bg-[#fafafa]'}`}
    >
      <div id="page-header">
        <div
          className={`page-container ${props.pageContainerClass || ''} flex items-center justify-between mb-8`}
        >
          <div className="page-label default-text-color">{props.header}</div>
          {active_tab === '/roadmap' && (
            <div id="RoadmapFilter" className="search">
              <div className="control has-icons-right input-field">
                <input
                  id="search-field"
                  className="input border-t-0 border-r-0 border-l-0 rounded-none border-[#c5c5da] bg-transparent text-[#3d3d5e] p-2 shadow-none"
                  onChange={(e) => {
                    const titleFilter = e.target.value;
                    setTitle(titleFilter);
                    if (titleFilter.length === 0) {
                      setFilter({
                        ...filter,
                        filtering: titleFilter.length > 0,
                        title: titleFilter,
                      });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      setFilter({
                        ...filter,
                        filtering: title.length > 0,
                        title,
                      });
                    }
                  }}
                  placeholder="Search ideas"
                  type="text"
                  value={title}
                />
                <span className="icon is-right">
                  <figure className="image is-16x16">
                    <img
                      onClick={() =>
                        setFilter({
                          ...filter,
                          filtering: title.length > 0,
                          title,
                        })
                      }
                      src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/search.svg"
                    />
                  </figure>
                </span>
              </div>
            </div>
          )}
          <div className="right-header">
            {active_tab === '/roadmap' && <RoadmapFilter />}
            {props.listWhatsNew && (
              <div>
                <div className="field is-grouped">
                  <WhatsNewFilter />
                  {!is_public &&
                    user?.rbac_permissions.includes(
                      RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                    ) && (
                      <button
                        className="new-post-button"
                        type="button"
                        onClick={() => props.openPostForm?.(undefined)}
                        disabled={props.disabled}
                      >
                        <PlusIcon />
                        New Post
                      </button>
                    )}
                </div>
              </div>
            )}
            {props.secondaryButtonLabel && (
              <div id="secondary-button">
                <button
                  className={
                    props.loading || props.disabled ? '' : 'is-clickable'
                  }
                  onClick={props.handleOnCancel}
                  disabled={props.loading || props.disabled}
                >
                  {props.secondaryButtonLabel}
                </button>
              </div>
            )}
            {props.buttonLabel &&
              ((has_new_idea_button &&
                is_member &&
                user?.rbac_permissions.includes(
                  RbacPermissions.CREATE_EDIT_IDEAS
                )) ||
                !is_member ||
                !has_new_idea_button) && (
                <div id="primary-button">
                  <button
                    className={
                      props.loading || props.disabled ? '' : 'is-clickable'
                    }
                    onClick={() =>
                      props.handleOnUpdate === undefined
                        ? setIsOpen(true)
                        : props.handleOnUpdate()
                    }
                    disabled={props.loading || props.disabled}
                  >
                    {props.showButtonIcon && <PlusIcon />}
                    {props.loading ? 'Loading...' : props.buttonLabel}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
