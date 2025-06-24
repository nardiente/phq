import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Attributes, CustomerAttributes } from '../types/segment';

interface AttributeSidebarProps {
  onFilterChange: (
    newFilters: {
      [key in Attributes]?: { operator: string; filterValue: string };
    },
    newSelectedAttributes: {
      [key in Attributes]?: boolean;
    }
  ) => void;
  onClear: () => void;
  currentSelectedAttributes?: { [key in Attributes]?: boolean };
  currentFilters?: {
    [key in Attributes]?: { operator: string; filterValue: string };
  };
  onCancel: () => void;
  onSave: () => void;
}

const AttributeSidebar: React.FC<AttributeSidebarProps> = ({
  onFilterChange,
  onClear,
  currentSelectedAttributes,
  currentFilters,
  // onCancel,
  // onSave,
}) => {
  const [state, setState] = useState({
    searchTerm: '',
    expandedAttributes: {} as { [key: string]: boolean },
  });

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key in Attributes]?: boolean;
  }>(currentSelectedAttributes || {});
  const [filters, setFilters] = useState<{
    [key in Attributes]?: { operator: string; filterValue: string };
  }>(currentFilters || {});
  const [dateRange, setDateRange] = useState<{
    [key: string]: { startDate: Date | null; endDate: Date | null };
  }>({});

  useEffect(() => {
    setSelectedAttributes(currentSelectedAttributes || {});
    setFilters(currentFilters || {});
  }, [currentSelectedAttributes, currentFilters]);

  const getOperatorsForAttribute = (attribute: string) => {
    switch (attribute) {
      case 'User ID':
        return [
          'equals',
          'is greater than',
          'is less than',
          'is empty',
          'is not empty',
        ];
      case 'Signed Up':
      case 'Last seen':
        return [
          'equals',
          'is greater than',
          'is less than',
          'is empty',
          'is not empty',
          'between',
        ];
      default:
        return [
          'equals',
          'contains',
          'ends with',
          'starts with',
          'is empty',
          'is not empty',
        ];
    }
  };

  const updateFilters = (
    attribute: Attributes,
    newSelectedAttributes: { [key in Attributes]?: boolean }
  ) => {
    if (!newSelectedAttributes[attribute]) {
      const newFilters = { ...filters };
      delete newFilters[attribute];
      return newFilters;
    }
    return filters || {};
  };

  const handleCheckboxChange = (attribute: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [attribute]: !selectedAttributes?.[attribute as Attributes],
    };
    setSelectedAttributes(newSelectedAttributes);

    const newFilters = updateFilters(
      attribute as Attributes,
      newSelectedAttributes
    );

    onFilterChange(newFilters, newSelectedAttributes);
  };

  const handleOperatorChange = (attribute: Attributes, operator: string) => {
    const newFilters = {
      ...filters,
      [attribute]: {
        ...filters?.[attribute],
        operator,
      },
    };
    setFilters(newFilters);

    onFilterChange(newFilters, selectedAttributes);
  };

  const handleValueChange = (attribute: Attributes, filterValue: string) => {
    const newFilters = {
      ...filters,
      [attribute]: {
        ...filters?.[attribute],
        filterValue,
      },
    };
    setFilters(newFilters);

    onFilterChange(newFilters, selectedAttributes);
  };

  const handleDateChange = (
    attribute: Attributes,
    date: Date | null,
    type: 'startDate' | 'endDate'
  ) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [attribute]: {
        ...prevDateRange[attribute],
        [type]: date,
      },
    }));

    const newFilters = {
      ...filters,
      [attribute]: {
        ...filters?.[attribute],
        [type]: date,
      },
    };
    setFilters(newFilters);
    onFilterChange(newFilters, selectedAttributes);
  };

  const handleClear = () => {
    setSelectedAttributes({});
    setFilters({});
    onClear();
  };

  const renderFilterInput = (attribute: Attributes) => {
    if (filters[attribute]?.operator === 'between') {
      return (
        <div className="flex space-x-2">
          <DatePicker
            selected={dateRange[attribute]?.startDate || null}
            selectsStart
            startDate={dateRange[attribute]?.startDate || null}
            endDate={dateRange[attribute]?.endDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(attribute, date, 'startDate')
            }
            placeholderText="Start Date"
            className="w-full p-2 border rounded-md"
          />
          <DatePicker
            selected={dateRange[attribute]?.endDate || null}
            selectsEnd
            startDate={dateRange[attribute]?.startDate || null}
            endDate={dateRange[attribute]?.endDate || null}
            minDate={dateRange[attribute]?.startDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(attribute, date, 'endDate')
            }
            placeholderText="End Date"
            className="w-full p-2 border rounded-md"
          />
        </div>
      );
    }

    return (
      <input
        type={attribute === 'Lifetime Value' ? 'number' : 'text'}
        className="w-full p-2 border rounded-md"
        placeholder="Enter value"
        value={filters[attribute]?.filterValue || ''}
        onChange={(e) => handleValueChange(attribute, e.target.value)}
      />
    );
  };

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 border-r border-gray-200 overflow-y-auto flex-grow">
        <h2 className="text-lg font-semibold mb-4">Customer Attributes</h2>

        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search attributes"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            value={state.searchTerm}
            onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-2">
          {CustomerAttributes.filter((attr) =>
            attr.label.toLowerCase().includes(state.searchTerm.toLowerCase())
          ).map((attribute) => {
            const isSelected = selectedAttributes[attribute.label];
            return (
              <div
                key={attribute.key}
                className={`rounded-lg ${isSelected ? 'bg-purple-50' : ''}`}
              >
                <div className="p-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected || false}
                      onChange={() => handleCheckboxChange(attribute.label)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">
                      {capitalizeWords(attribute.label)}
                    </span>
                  </label>

                  {isSelected && (
                    <div className="mt-3 space-y-2">
                      <select
                        className="w-full p-2 border rounded-md text-gray-700"
                        value={filters[attribute.label]?.operator || 'equals'}
                        onChange={(e) =>
                          handleOperatorChange(attribute.label, e.target.value)
                        }
                      >
                        {getOperatorsForAttribute(attribute.label).map((op) => (
                          <option key={op} value={op} className="text-gray-700">
                            {op}
                          </option>
                        ))}
                      </select>
                      {renderFilterInput(attribute.label)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200 p-4 border-gray-200 border-r flex-grow-0">
        <button
          className="w-full mt-2 px-4 py-2 bg-[#5a00cd] text-white rounded hover:bg-opacity-90"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default AttributeSidebar;
