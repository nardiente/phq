import { useEffect, useRef, useState } from 'react';
import './styles.css';

export const DropdownAdmin: React.FC<{
  container_class?: string;
  content: React.ReactNode;
  content_class?: string;
  content_container_class?: string;
  label: React.ReactNode;
  label_class?: string;
  tab_index?: number;
}> = (props) => {
  const ref = useRef<HTMLElement>();
  const [is_expanded, setExpanded] = useState(false);

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
      ref={ref as React.LegacyRef<HTMLDivElement>}
    >
      <span
        style={{
          color: '#1F2937',
          fontFamily: 'Satoshi-Variable',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '18.9px',
        }}
      >
        Status
      </span>
      <div
        className={`dropdown ${is_expanded ? ' is-active' : ''}${
          props.container_class ? ` ${props.container_class}` : ''
        }`}
        style={{ marginTop: '10px', width: '100%' }}
      >
        <div className="dropdown-trigger" style={{ width: '100%' }}>
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
          className={`dropdown-menu width-100${
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
      </div>
    </div>
  );
};
