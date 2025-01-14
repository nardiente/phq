import { LegacyRef } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { FC } from 'react';
import '../WhatsNewFilter/styles.css';

export const DropdownWhatsNew: FC<{
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

  const toggle = () => setExpanded(!is_expanded);

  useEffect(() => {
    const expand = (e: any) => {
      if (!ref.current || !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', expand);
    return () => {
      document.removeEventListener('mousedown', expand);
    };
  }, []);

  return (
    <div ref={ref as LegacyRef<HTMLDivElement>}>
      <div
        className={`dropdown ${is_expanded ? ' is-active' : ''}${
          props.container_class ? ` ${props.container_class}` : ''
        }`}
      >
        <div className="dropdown-trigger">
          <button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            className={`${props.label_class ? ` ${props.label_class}` : ''}`}
            onClick={toggle}
            tabIndex={props.tab_index}
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
          style={{ left: 0 }}
        >
          <div
            className={`dropdown-content${
              props.content_class ? ` ${props.content_class}` : ''
            }`}
            style={{ width: '230px' }}
          >
            {props.content}
          </div>
        </div>
      </div>
    </div>
  );
};
