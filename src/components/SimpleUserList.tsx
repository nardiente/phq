import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Attributes, CustomerAttributes } from '../types/segment';

interface SimpleUserListProps {
  users: any[];
  selectedAttributes: { [key in Attributes]?: boolean };
}

const SimpleUserList: React.FC<SimpleUserListProps> = ({
  users = [],
  selectedAttributes = {},
}) => {
  const attributesToShow = useMemo(() => {
    return Object.keys(selectedAttributes).filter(
      (key) => selectedAttributes?.[key as Attributes]
    );
  }, [selectedAttributes]);

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const tableRef = useRef<HTMLTableElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    if (!tableRef.current) return;

    const calculateColumnWidths = () => {
      const headerCells = Array.from(
        tableRef.current?.querySelectorAll('thead th') ?? []
      ) as HTMLTableCellElement[];
      const bodyRows = Array.from(
        tableRef.current?.querySelectorAll('tbody tr') ?? []
      ) as HTMLTableRowElement[];

      const newColumnWidths: Record<string, number> = {};

      attributesToShow.forEach((attribute, index) => {
        let maxWidth = headerCells[index].offsetWidth;

        bodyRows.forEach((row) => {
          const cell = row.cells[index] as HTMLTableCellElement;
          maxWidth = Math.max(maxWidth, cell.offsetWidth);
        });

        newColumnWidths[attribute] = maxWidth;
      });

      setColumnWidths(newColumnWidths);
    };

    calculateColumnWidths();
    window.addEventListener('resize', calculateColumnWidths);

    return () => {
      window.removeEventListener('resize', calculateColumnWidths);
    };
  }, [attributesToShow, users]);

  const handleResizeStart = (event: React.MouseEvent, column: string) => {
    setIsResizing(true);
    setResizingColumn(column);
    setStartX(event.clientX);
    setMouseDown(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isResizing || !resizingColumn) return;

    const newWidth = columnWidths[resizingColumn] + event.clientX - startX;
    setColumnWidths({ ...columnWidths, [resizingColumn]: newWidth });
    setStartX(event.clientX);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizingColumn(null);
    setMouseDown(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, columnWidths]);

  const handleSort = (attribute: string) => {
    if (isResizing || mouseDown) {
      return;
    }

    if (sortBy === attribute) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(attribute);
      setSortOrder('asc');
    }
  };

  const sortedUsers = useMemo(() => {
    if (!sortBy) return users;

    return [...users].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA === valueB) return 0;

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [users, sortBy, sortOrder]);

  const columns = useMemo(
    () =>
      attributesToShow.map((attribute) => {
        const userAttribute =
          CustomerAttributes.find(
            (customerAttribute) => customerAttribute.label === attribute
          )?.key ?? '';

        return {
          key: userAttribute,
          title: attribute,
          sortable: true,
          width: columnWidths[attribute] || 150,
        };
      }),
    [attributesToShow, columnWidths]
  );

  return (
    <div className="flex overflow-auto w-full pl-[10px]">
      <table className="w-auto table-auto min-w-[1024px]" ref={tableRef}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  padding: '0.5rem',
                  borderBottom: '1px solid #ddd',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  color: '#4a5568',
                  position: 'relative',
                  cursor: 'pointer',
                  width: column.width,
                }}
              >
                <div
                  className="flex justify-between"
                  onClick={() => handleSort(column.key)}
                >
                  <span>{column.title}</span>
                  {sortBy === column.key && sortOrder === 'asc' && (
                    <ArrowUp className="w-4 h-4 ml-1" />
                  )}
                  {sortBy === column.key && sortOrder === 'desc' && (
                    <ArrowDown className="w-4 h-4 ml-1" />
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '5px',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'col-resize',
                  }}
                  onMouseDown={(event) => handleResizeStart(event, column.key)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: '0.5rem',
                    borderBottom: '1px solid #ddd',
                    whiteSpace: 'normal',
                    fontFamily: 'sans-serif',
                    color: '#718096',
                  }}
                >
                  {String(user[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleUserList;
