import { FC, LegacyRef } from 'react';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './styles.css';
import { Tooltip } from 'react-tooltip';
import { InfoCircleIcon } from '../icons/info-circle.icon';

export const DropdownOnboarding: FC<{
  container_class?: string;
  content: ReactNode;
  content_class?: string;
  content_container_class?: string;
  label: ReactNode;
  label_class?: string;
  tab_index?: number;
}> = (props) => {
  const ref = useRef<HTMLElement>();
  const [is_expanded, setExpanded] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState<boolean>(false);

  const toggle = () => setExpanded(!is_expanded);

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

  return (
    <div
      style={{ marginTop: '16px', width: '100%' }}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <div
        className={`dropdown ${is_expanded ? ' is-active' : ''}${
          props.container_class ? ` ${props.container_class}` : ''
        } dropdown-trigger-container`}
      >
        <div className="dropdown-trigger width-400">
          <button
            id="for-status"
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            className={`button${
              props.label_class ? ` ${props.label_class}` : ''
            }`}
            onClick={toggle}
            style={{ fontSize: '14px' }}
            tabIndex={props.tab_index}
            type="button"
          >
            {props.label}
          </button>
        </div>
        <div
          aria-hidden={!is_expanded}
          className={`dropdown-menu${
            props.content_container_class
              ? ` ${props.content_container_class}`
              : ''
          }`}
          id="dropdown-menu"
          onClick={toggle}
          role="menu"
        >
          <div
            className={`dropdown-content${
              props.content_class ? ` ${props.content_class}` : ''
            }`}
          >
            {props.content}
          </div>
        </div>
        <div
          id="select-status-tooltip"
          className="is-clickable"
          onClick={() => setShowStatusTooltip((prev) => !prev)}
        >
          <InfoCircleIcon />
        </div>
      </div>
      <Tooltip
        anchorId="select-status-tooltip"
        isOpen={showStatusTooltip}
        place="top"
        variant="info"
      >
        Status indicates where an idea is in your development process.
      </Tooltip>
    </div>
  );
};
