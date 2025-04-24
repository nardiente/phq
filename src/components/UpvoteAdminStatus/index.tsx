import './styles.css';
import * as React from 'react';
import { UpvoteAdminStatusProps } from './types';
import { ChevronDownIcon } from '../icons/chevron-down.icon';
import { DropdownAdmin } from '../DropDownAdmin';
import { useFeedback } from '../../contexts/FeedbackContext';

export const UpvoteAdminStatus: React.FC<UpvoteAdminStatusProps> = (props) => {
  const {
    state: { roadmaps },
  } = useFeedback();

  return (
    <div id="upvote-admin-status">
      <div className="upvote-admin-status-container">
        <DropdownAdmin
          content={
            <React.Fragment>
              <div
                style={{
                  maxHeight: '290px',
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                <div
                  className={`drop-down-status${
                    roadmaps.length === 0 ? ' is-hidden' : ''
                  }`}
                >
                  <span className="drop-down-label">Statuses</span>
                  {roadmaps.map((roadmap, idx) => (
                    <span
                      key={idx}
                      className="dropdown-item is-clickable drop-down-font"
                      onClick={() =>
                        props.setActiveStatus(
                          roadmap.name === props.active_status
                            ? 'Select status'
                            : roadmap.name
                        )
                      }
                    >
                      &#x2022; &#160;
                      {roadmap.name}
                      <span
                        className={`selected${
                          props.active_status === roadmap.name
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
              <span>{props.active_status}</span>
              <span className="icon is-small" style={{ marginTop: '2px' }}>
                <ChevronDownIcon />
              </span>
            </React.Fragment>
          }
          content_class="dropdown-content"
          content_container_class=""
          label_class="drop-down-button"
        />
      </div>
    </div>
  );
};
