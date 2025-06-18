import { useRef, useState } from 'react';
import { useWhatsNew } from '../../../contexts/WhatsNewContext';
import { Check } from 'lucide-react';

export const WhatsNewHeader = () => {
  const ref = useRef<HTMLElement>();

  const {
    state: { change_types },
    listWhatsNew,
    setShowAddForm,
  } = useWhatsNew();

  const [active_change_types, setActiveChangeTypes] = useState<number[]>([]);
  const [is_expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!is_expanded);

  return (
    <div
      className="flex justify-between items-center mb-4 w-full"
      ref={ref as React.LegacyRef<HTMLDivElement>}
    >
      <div className="relative text-gray-900">
        <button
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md"
          onClick={toggle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
          </svg>
          Filter
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {is_expanded && (
          <div
            aria-hidden={!is_expanded}
            className={`z-10 dropdown-menu ${is_expanded ? 'block' : ''}`}
            id="dropdown-menu"
            onClick={toggle}
            role="menu"
          >
            <div className="dropdown-content rounded">
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
        )}
      </div>
      <button
        className="px-4 py-2 bg-[#FF6334] text-white rounded-md font-medium"
        onClick={() => setShowAddForm(true)}
      >
        + New Post
      </button>
    </div>
  );
};
