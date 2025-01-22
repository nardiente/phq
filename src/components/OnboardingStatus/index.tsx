import { FC, Fragment } from 'react';
import { DropdownOnboarding } from '../DropDownOnboarding';
import './styles.css';
import { OnboardingStatusProps } from './types';
import { ChevronDownIcon } from '../icons/chevron-down.icon';

export const OnboardingStatus: FC<OnboardingStatusProps> = (props) => {
  return (
    <div id="upvote-admin-status">
      <div className="upvote-admin-status-container">
        <DropdownOnboarding
          content={
            <Fragment>
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
                  <span className="drop-down-label">Statuses</span>
                  {props.roadmaps.map((roadmap, idx) => (
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
            </Fragment>
          }
          label={
            <Fragment>
              <span>{props.active_status}</span>
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
    </div>
  );
};
