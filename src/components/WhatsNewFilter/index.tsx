import './styles.css';
import { DropdownWhatsNew } from '../DropDownWhatsNew';
import { Check } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useWhatsNew } from '../../contexts/WhatsNewContext';

export const WhatsNewFilter = () => {
  const {
    state: { change_types },
    listWhatsNew,
  } = useWhatsNew();

  const [active_change_types, setActiveChangeTypes] = useState<number[]>([]);

  return (
    <DropdownWhatsNew
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
                change_types.length > 0 ? '' : ' is-hidden'
              }`}
            >
              {change_types.map((change_type, idx) => (
                <span
                  key={idx}
                  className="is-clickable hover:bg-[#f1f1f6] flex items-center gap-[8px] text-[14px] p-[8px] w-full font-satoshi font-medium"
                  onClick={() => {
                    let copy_active_change_types = active_change_types;
                    if (
                      copy_active_change_types.find(
                        (active_change_type) =>
                          active_change_type === change_type.id
                      )
                    ) {
                      copy_active_change_types =
                        copy_active_change_types.filter(
                          (active_change_type) =>
                            active_change_type !== change_type.id
                        );
                    } else {
                      copy_active_change_types.push(change_type.id);
                    }
                    setActiveChangeTypes(copy_active_change_types);
                    listWhatsNew(copy_active_change_types);
                  }}
                  style={{
                    color: change_type.change_type_color.font_color,
                  }}
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
                  {change_type.name}
                  <span
                    className={`selected${
                      active_change_types.find(
                        (active_change_type) =>
                          active_change_type === change_type.id
                      )
                        ? ''
                        : ' is-hidden'
                    }`}
                  >
                    <figure className="image is-16x16">
                      <Check className="text-[#110733]" size={16} />
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
          <span className="counter-font">{active_change_types.length}</span>
        </Fragment>
      }
      container_class="right-filter"
      content_class="dropdown-content"
      content_container_class="dropdown-menu"
      label_class="whats-new-filter-button"
    />
  );
};
