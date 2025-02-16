import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AttributeSidebar from '../components/AttributeSidebar';
import SegmentHeader from '../components/SegmentHeader';
import SimpleUserList from '../components/SimpleUserList';
import { User } from '../types/user';
import { Segment } from '../types/segment';
import SaveSegmentModal from '../components/Modal/SaveSegmentModal';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';

export default function SegmentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: boolean;
  }>({});
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [savedSegments, setSavedSegments] = useState<Segment[]>([]);
  const [currentSegment, setCurrentSegment] = useState<Segment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    segmentId: '',
    segmentName: '',
  });

  console.log('Users:', users);
  console.log('Search term:', searchTerm);
  console.log('Search results:', searchResults);
  console.log('Selected attributes:', selectedAttributes);
  console.log('Filters:', filters);
  console.log('Saved segments:', savedSegments);
  console.log('Current segment:', currentSegment);
  console.log('Is modal open:', isModalOpen);
  console.log('Has unsavedChanges:', hasUnsavedChanges);

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch('http://localhost:3001/users');
      const usersData = await usersResponse.json();
      console.log('Fetched users data:', usersData);
      setUsers(usersData || []);
      setSearchResults(usersData || []);
    } catch (error) {
      console.error('Error loading users data:', error);
    }
  };

  const fetchSegments = async () => {
    try {
      const segmentsResponse = await fetch('http://localhost:3001/segments');
      const segmentsData = await segmentsResponse.json();
      console.log('Fetched segments data:', segmentsData);
      setSavedSegments(segmentsData || []);
      console.log('Saved segments after fetch:', savedSegments);
    } catch (error) {
      console.error('Error loading segments data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSegments();
  }, []);

  const filtered = useMemo(() => {
    console.log('Filtering and searching...');
    let filtered = [...users];

    // Apply filters
    filtered = filtered.filter((user) => {
      return Object.keys(filters).every((attribute) => {
        const filter = filters[attribute];
        const value = user[attribute];

        console.log('Filter:', filter);
        console.log('Value:', value);

        if (!filter || !filter.operator) {
          return true;
        }

        const { operator, filterValue } = filter;

        switch (operator) {
          case 'equals':
            return String(value) === String(filterValue);
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
            return Number(value) > Number(filterValue);
          case 'is less than':
            return String(value) < String(filterValue);
          case 'is empty':
            return !value;
          case 'is not empty':
            return !!value;
          default:
            return true;
        }
      });
    });

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((user) =>
        Object.keys(selectedAttributes).some((attribute) => {
          if (selectedAttributes[attribute]) {
            const value = user[attribute];
            return String(value).toLowerCase().includes(term);
          }
          return false;
        })
      );
    }
    console.log('Selected attributes:', selectedAttributes);
    console.log('Filtered data:', filtered);
    return filtered;
  }, [filters, selectedAttributes, searchTerm, users]);

  useEffect(() => {
    setSearchResults(filtered);
  }, [filtered]);

  const handleFilterChange = (
    newFilters: { [key: string]: any },
    newSelectedAttributes: { [key: string]: boolean }
  ) => {
    console.log('handleFilterChange - New Filters:', newFilters);
    console.log(
      'handleFilterChange - New Selected Attributes:',
      newSelectedAttributes
    );

    setFilters(newFilters);
    setSelectedAttributes(newSelectedAttributes);
    setHasUnsavedChanges(true);
  };

  const handleClear = () => {
    setCurrentSegment(null);
    setFilters({});
    setSelectedAttributes({});
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    setFilters({});
    setSelectedAttributes({});
  };

  const handleSave = () => {
    // Save logic here
  };

  const handleSaveSegment = async (segmentName: string) => {
    const newSegment: Segment = {
      id: Math.random().toString(36).substring(7),
      name: segmentName,
      filters: filters,
      selectedAttributes: selectedAttributes,
    };

    try {
      const response = await fetch('http://localhost:3001/segments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSegment),
      });

      console.log('Save segment response:', response);

      const updatedSegments = [...savedSegments, newSegment];

      setSavedSegments(updatedSegments);
      console.log('Saved segments:', updatedSegments);
      setCurrentSegment(newSegment);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  const handleUpdateSegment = async () => {
    if (!currentSegment) return;

    const updatedSegment: Segment = {
      id: currentSegment.id,
      name: currentSegment.name,
      filters: filters,
      selectedAttributes: selectedAttributes,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/segments/${currentSegment.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSegment),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedSegments = savedSegments.map((segment: any) => {
        if (segment[0] && segment[0].id === currentSegment.id) {
          segment[0] = updatedSegment;
        } else if (segment.id === currentSegment.id) {
          return updatedSegment;
        }
        return segment;
      });

      setSavedSegments(updatedSegments);
      setCurrentSegment(updatedSegment);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error updating segment:', error);
    }
  };

  const handleDeleteSegment = async (segmentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/segments/${segmentId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedSegments = savedSegments.filter(
        (segment) => segment.id !== segmentId
      );
      setSavedSegments(updatedSegments);
      setCurrentSegment(null);
    } catch (error) {
      console.error('Error deleting segment:', error);
    }
  };

  const handleSelectSegment = (segment: Segment) => {
    // Implement the logic to handle segment selection
    console.log('Selected segment:', segment);
    setCurrentSegment(segment);
    setFilters(segment.filters);
    setSelectedAttributes(segment.selectedAttributes);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AttributeSidebar
        onFilterChange={handleFilterChange}
        onClear={handleClear}
        currentSelectedAttributes={selectedAttributes}
        currentFilters={filters}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <div style={{ flex: 1, overflowY: 'auto', height: '100%' }}>
        <SegmentHeader
          onSaveSegment={handleSaveSegment}
          onUpdateSegment={handleUpdateSegment}
          onSaveAsNewSegment={() => {}}
          savedSegments={savedSegments}
          onSelectSegment={handleSelectSegment}
          onDeleteSegment={handleDeleteSegment}
          currentSegment={currentSegment}
          hasUnsavedFilters={hasUnsavedChanges}
          onSearch={() => {}}
        />
        <SimpleUserList
          users={searchResults}
          selectedAttributes={selectedAttributes}
        />
        {searchResults.length === 0 && searchTerm.trim() !== '' && (
          <div style={{ padding: '1rem' }}>We didn't find anything.</div>
        )}
      </div>
    </div>
  );
}
