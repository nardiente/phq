import { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import './styles.css';

const ColumnInput = ({
  value,
  setEditColumnNameId,
  setColumnName,
  handleConfirm,
  disable,
  isAddColumn = false,
}: {
  value: string;
  setEditColumnNameId: Dispatch<SetStateAction<number>>;
  setColumnName: React.Dispatch<React.SetStateAction<string>>;
  handleConfirm: () => void;
  disable: boolean;
  isAddColumn?: boolean;
}) => {
  const columnDivRef = useRef<HTMLDivElement>(null);
  const [oldValue] = useState(value);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        columnDivRef.current &&
        !columnDivRef.current.contains(event.target)
      ) {
        setEditColumnNameId(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={columnDivRef} id="ColumnInput">
      <div className="form">
        <input
          type="text"
          placeholder={isAddColumn ? 'New column' : ''}
          value={value}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <button
          type="button"
          className={!disable ? 'is-clickable' : ''}
          onClick={handleConfirm}
          disabled={disable || value.length == 0 || value == oldValue}
        >
          Confirm
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-return-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ColumnInput;
