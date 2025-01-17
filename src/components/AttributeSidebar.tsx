import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface AttributeSidebarProps {
  onFilterChange: (
    filters: { [key: string]: any },
    selectedAttrs: { [key: string]: boolean }
  ) => void;
  onClear?: () => void;
  currentSelectedAttributes?: { [key: string]: boolean };
  currentFilters?: { [key: string]: any };
}

const AttributeSidebar: React.FC<AttributeSidebarProps> = ({
  onFilterChange,
  onClear,
  currentSelectedAttributes,
  currentFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAttributes, setExpandedAttributes] = useState<{
    [key: string]: boolean;
  }>({});

  const attributes = [
    'User ID',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Signed Up',
    'Subscription plan',
    'Last seen',
    'Status',
    'Date of Birth',
    'Lifetime Spend',
    'Role',
    'Job Title',
    'Data attribute',
  ];

  const getOperatorsForAttribute = (attribute: string) => {
    switch (attribute) {
      case 'Lifetime Spend':
        return [
          'equals',
          'is greater than',
          'is less than',
          'is empty',
          'is not empty',
        ];
      case 'Signed Up':
      case 'Last seen':
      case 'Date of Birth':
        return [
          'equals',
          'is greater than',
          'is less than',
          'is empty',
          'is not empty',
        ];
      case 'Subscription plan':
        return ['equals', 'is empty', 'is not empty'];
      default:
        return [
          'equals',
          'contains',
          'starts with',
          'ends with',
          'is empty',
          'is not empty',
        ];
    }
  };

  const handleCheckboxChange = (attribute: string) => {
    const newSelectedAttributes = {
      ...currentSelectedAttributes,
      [attribute]: !currentSelectedAttributes?.[attribute],
    };

    const newExpandedAttributes = {
      ...expandedAttributes,
      [attribute]: !currentSelectedAttributes?.[attribute],
    };

    setExpandedAttributes(newExpandedAttributes);

    if (!newSelectedAttributes[attribute]) {
      const newFilters = { ...currentFilters };
      delete newFilters[attribute];
      onFilterChange(newFilters, newSelectedAttributes);
    } else {
      onFilterChange(currentFilters || {}, newSelectedAttributes);
    }
  };

  const handleOperatorChange = (attribute: string, operator: string) => {
    const newFilters = {
      ...currentFilters,
      [attribute]: { operator, filterValue: '' },
    };
    onFilterChange(newFilters, currentSelectedAttributes || {});
  };

  const handleValueChange = (attribute: string, value: string) => {
    if (!currentFilters?.[attribute]) return;

    const newFilters = {
      ...currentFilters,
      [attribute]: { ...currentFilters[attribute], filterValue: value },
    };
    onFilterChange(newFilters, currentSelectedAttributes ?? {});
  };

  const handleClear = () => {
    setExpandedAttributes({});
    onFilterChange({}, {});
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-72 bg-white p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Customer Attributes</h2>

      <div className="relative mb-2">
        <input
          type="text"
          placeholder="Search attributes"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <button
        onClick={handleClear}
        className="w-[90%] mb-4 px-4 py-2 bg-[#5a00cd] text-white rounded-md hover:bg-opacity-90 flex items-center justify-center"
      >
        <span>Clear</span>
        <X className="h-4 w-4 ml-1" />
      </button>

      <div className="space-y-2">
        {attributes
          .filter((attr) =>
            attr.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((attribute) => (
            <div key={attribute} className="rounded-lg bg-white">
              <div className="p-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentSelectedAttributes?.[attribute] || false}
                    onChange={() => handleCheckboxChange(attribute)}
                    className="mr-3"
                  />
                  <span>{attribute}</span>
                </label>

                {currentSelectedAttributes?.[attribute] && (
                  <div className="mt-3 space-y-2">
                    <select
                      className="w-full p-2 border rounded-md"
                      value={currentFilters?.[attribute]?.operator || ''}
                      onChange={(e) =>
                        handleOperatorChange(attribute, e.target.value)
                      }
                    >
                      <option value="">Select operator</option>
                      {getOperatorsForAttribute(attribute).map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>

                    {currentFilters?.[attribute]?.operator &&
                      !['is empty', 'is not empty'].includes(
                        currentFilters[attribute].operator
                      ) && (
                        <input
                          type={
                            attribute === 'Lifetime Spend' ? 'number' : 'text'
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter value"
                          value={currentFilters[attribute]?.filterValue || ''}
                          onChange={(e) =>
                            handleValueChange(attribute, e.target.value)
                          }
                        />
                      )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AttributeSidebar;
