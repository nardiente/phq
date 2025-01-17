import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnOrderState,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SimpleUserListProps {
  users: any[];
  selectedAttributes: { [key: string]: boolean };
  filters: { [key: string]: any };
}

const SimpleUserList: React.FC<SimpleUserListProps> = ({
  users = [],
  selectedAttributes = {},
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const columns = React.useMemo(
    () =>
      Object.keys(selectedAttributes)
        .filter((key) => selectedAttributes[key])
        .map((key) => ({
          id: key,
          accessorKey: key,
          header: ({ column }: any) => {
            return (
              <div
                className="flex items-center space-x-2 cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', column.id);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedColumnId = e.dataTransfer.getData('text/plain');
                  const newColumnOrder = [...table.getState().columnOrder];
                  const draggedIdx = newColumnOrder.indexOf(droppedColumnId);
                  const droppedIdx = newColumnOrder.indexOf(column.id);

                  if (draggedIdx !== -1 && droppedIdx !== -1) {
                    newColumnOrder.splice(draggedIdx, 1);
                    newColumnOrder.splice(droppedIdx, 0, droppedColumnId);
                    setColumnOrder(newColumnOrder);
                  }
                }}
              >
                <span>{key}</span>
                <button
                  onClick={() => column.toggleSorting()}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  {column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          },
        })),
    [selectedAttributes]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnOrder,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  React.useEffect(() => {
    if (columnOrder.length === 0 && columns.length > 0) {
      setColumnOrder(columns.map((col) => col.id));
    }
  }, [columns, columnOrder.length]);

  if (!users || users.length === 0) return null;

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative h-14"
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none ${
                      header.column.getIsResizing()
                        ? 'bg-blue-500'
                        : 'bg-gray-200'
                    }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 whitespace-nowrap text-sm text-gray-500 h-14 pt-4"
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  ) || <span>&nbsp;</span>}
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
