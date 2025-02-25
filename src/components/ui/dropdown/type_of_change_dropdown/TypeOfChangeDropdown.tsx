import './styles.css';
import { PlusIcon } from '../../../../components/icons/plus.icon';
import { Dispatch, SetStateAction, useState } from 'react';
import { ChangeType } from '../../../../types/whats-new';

const TypeOfChangeDropdown = ({
  changeTypes,
  disabled,
  selectedChangeTypes,
  setSelectedChangeTypes,
}: {
  changeTypes: ChangeType[];
  disabled: boolean;
  selectedChangeTypes: ChangeType[];
  setSelectedChangeTypes: Dispatch<SetStateAction<ChangeType[]>>;
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <div id="TypeOfChange">
      <div className="row">
        <button
          className={`option-button` + (showOptions ? ' active' : '')}
          type="button"
          onClick={() => setShowOptions((prev) => !prev)}
          disabled={disabled}
        >
          <PlusIcon />
        </button>
        {selectedChangeTypes.length == 0 ? (
          <span>Type of change</span>
        ) : (
          selectedChangeTypes.map((type, idx) => (
            <div
              key={idx}
              className="badge"
              style={{
                color: type.change_type_color.font_color,
                background: type.change_type_color.background_color,
              }}
            >
              {type.name}
            </div>
          ))
        )}
      </div>
      {showOptions && (
        <div className="options">
          {changeTypes.map((type, idx) => (
            <button
              key={idx}
              className="type-button"
              type="button"
              onClick={() => {
                setShowOptions(false);
                if (selectedChangeTypes.some((t) => t.id === type.id)) {
                  setSelectedChangeTypes(
                    selectedChangeTypes.filter((t) => t.id !== type.id)
                  );
                } else {
                  setSelectedChangeTypes([...selectedChangeTypes, type]);
                }
              }}
              style={{
                color: type.change_type_color.font_color,
              }}
              disabled={false}
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
              {type.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeOfChangeDropdown;
