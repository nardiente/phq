import * as React from 'react';
import { useApp } from '../../contexts/AppContext';

export const DropdownRoadmap: React.FC<{
  container_class?: string;
  content: React.ReactNode;
  content_class?: string;
  content_container_class?: string;
  label: React.ReactNode;
  label_class?: string;
  tab_index?: number;
}> = (props) => {
  const { is_public } = useApp();

  const ref = React.useRef<HTMLElement>();
  const [is_expanded, setExpanded] = React.useState(false);

  const toggle = () => setExpanded(!is_expanded);

  React.useEffect(() => {
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
    <div ref={ref as React.LegacyRef<HTMLDivElement>}>
      <div
        className={`dropdown ${is_expanded ? ' is-active' : ''}${
          props.container_class ? ` ${props.container_class}` : ''
        }`}
      >
        <div className="dropdown-trigger">
          <button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            className={`button ${is_public ? 'background-color' : 'bg-white'}${
              props.label_class ? ` ${props.label_class}` : ''
            }`}
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
