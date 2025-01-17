import { useEffect, useState } from 'react';
import AttributeSidebar from '../components/AttributeSidebar';
import { useUnsavedChanges } from '../contexts/UnsavedChangesContext';
import { User } from '../types/user';
import { Segment } from '../types/segment';
import SegmentHeader from '../components/SegmentHeader';
import SimpleUserList from '../components/SimpleUserList';

export default function SegmentsPage() {
  const { hasUnsavedChanges, setHasUnsavedChanges } = useUnsavedChanges();

  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: boolean;
  }>({});
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [currentSegment, setCurrentSegment] = useState<Segment | null>(null);
  const [savedSegments, setSavedSegments] = useState<Segment[]>([]);
  const [, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/users.json')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setSearchResults(data);
      })
      .catch((error) => console.error('Error loading users:', error));

    fetch('/savedsegments.json')
      .then((response) => response.json())
      .then((data) => {
        setSavedSegments(data);
      })
      .catch((error) => console.error('Error loading saved segments:', error));
  }, []);

  const handleFilterChange = (
    newFilters: { [key: string]: any },
    newSelectedAttrs: { [key: string]: boolean }
  ) => {
    console.log('handleFilterChange - New Filters:', newFilters);
    console.log(
      'handleFilterChange - New Selected Attributes:',
      newSelectedAttrs
    );

    // Merge with existing filters and attributes instead of replacing
    const mergedFilters = { ...filters, ...newFilters };
    const mergedAttributes = { ...selectedAttributes, ...newSelectedAttrs };

    setFilters(mergedFilters);
    setSelectedAttributes(mergedAttributes);
    setHasUnsavedChanges(true);

    const filtered = users.filter((user) => {
      return Object.entries(mergedFilters).every(([attribute, filter]) => {
        if (!filter || !filter.operator) return true;

        const value = user[attribute as keyof User];
        const { operator, filterValue } = filter;

        switch (operator) {
          case 'equals':
            return value === filterValue;
          case 'contains':
            return String(value)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
          case 'starts with':
            return String(value)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase());
          case 'ends with':
            return String(value)
              .toLowerCase()
              .endsWith(String(filterValue).toLowerCase());
          case 'is greater than':
            if (attribute === 'Lifetime Spend') {
              return Number(value) > Number(filterValue);
            }
            return String(value) > String(filterValue);
          case 'is less than':
            if (attribute === 'Lifetime Spend') {
              return Number(value) < Number(filterValue);
            }
            return String(value) < String(filterValue);
          case 'is empty':
            return !value || value === '';
          case 'is not empty':
            return value && value !== '';
          default:
            return true;
        }
      });
    });

    setFilteredUsers(filtered);
    setSearchResults(filtered);
  };

  const handleClear = () => {
    setCurrentSegment(null);
    setFilters({});
    setSelectedAttributes({});
    setHasUnsavedChanges(false);
    handleFilterChange({}, {});
  };

  const handleSaveSegment = (name: string) => {
    console.log('handleSaveSegment - Current Filters:', filters);
    console.log(
      'handleSaveSegment - Current Selected Attributes:',
      selectedAttributes
    );

    const newSegment: Segment = {
      id: Date.now().toString(),
      name,
      filters,
      selectedAttributes,
    };

    console.log('handleSaveSegment - New Segment:', newSegment);

    setSavedSegments((prev) => [...prev, newSegment]);
    setCurrentSegment(newSegment);
    setHasUnsavedChanges(false);
  };

  const handleUpdateSegment = (id: string, name: string) => {
    const updatedSegments = savedSegments.map((segment) =>
      segment.id === id
        ? { ...segment, name, filters, selectedAttributes }
        : segment
    );
    setSavedSegments(updatedSegments);
    const updated = updatedSegments.find((s) => s.id === id) || null;
    setCurrentSegment(updated);
    setHasUnsavedChanges(false);
  };

  const handleSaveAsNewSegment = (name: string) => {
    const newSegment: Segment = {
      id: Date.now().toString(),
      name,
      filters,
      selectedAttributes,
    };

    setSavedSegments((prev) => [...prev, newSegment]);
    setCurrentSegment(newSegment);
    setHasUnsavedChanges(false);
  };

  const handleSelectSegment = (segment: Segment) => {
    console.log('handleSelectSegment - Selected Segment:', segment);
    console.log('handleSelectSegment - Segment Filters:', segment.filters);
    console.log(
      'handleSelectSegment - Segment Selected Attributes:',
      segment.selectedAttributes
    );

    setCurrentSegment(segment);
    setFilters(segment.filters);
    setSelectedAttributes(segment.selectedAttributes ?? {});
    setHasUnsavedChanges(false);

    handleFilterChange(segment.filters, segment.selectedAttributes ?? {});
  };

  const handleDeleteSegment = (segmentId: string) => {
    const updatedSegments = savedSegments.filter(
      (segment) => segment.id !== segmentId
    );
    setSavedSegments(updatedSegments);
    if (currentSegment?.id === segmentId) {
      setCurrentSegment(null);
      setFilters({});
      setSelectedAttributes({});
      handleFilterChange({}, {});
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults(filteredUsers);
      return;
    }

    const results = filteredUsers.filter((user) => {
      return Object.values(user).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term.toLowerCase());
      });
    });

    setSearchResults(results);
  };

  return (
    <div className="flex">
      <AttributeSidebar
        onFilterChange={handleFilterChange}
        onClear={handleClear}
        currentSelectedAttributes={selectedAttributes}
        currentFilters={filters}
      />
      <div className="flex-1">
        <SegmentHeader
          onSaveSegment={handleSaveSegment}
          onUpdateSegment={handleUpdateSegment}
          onSaveAsNewSegment={handleSaveAsNewSegment}
          savedSegments={savedSegments}
          onSelectSegment={handleSelectSegment}
          onDeleteSegment={handleDeleteSegment}
          onSearch={handleSearch}
          currentSegment={currentSegment}
          hasUnsavedFilters={hasUnsavedChanges}
        />
        <SimpleUserList
          users={searchResults}
          selectedAttributes={selectedAttributes}
          filters={filters}
        />
      </div>
    </div>
  );
}
