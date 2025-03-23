import { useState, useEffect, useMemo } from 'react';
import AttributeSidebar from '../components/AttributeSidebar';
import SegmentHeader from '../components/SegmentHeader';
import SimpleUserList from '../components/SimpleUserList';
import { User } from '../types/user';
import { Attributes, CustomerAttributes, Segment } from '../types/segment';
import { useSegment } from '../contexts/SegmentContext/SegmentProvider';
import { useUser } from '../contexts/UserContext';
import moment from 'moment';

export default function SegmentsPage() {
  const {
    state: { segments },
    addSegment,
    deleteSegment,
    listSegments,
    updateSegment,
  } = useSegment();
  const { users, listUsers } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key in Attributes]?: boolean;
  }>({});
  const [filters, setFilters] = useState<{
    [key in Attributes]?: { operator: string; filterValue: string };
  }>({});
  const [currentSegment, setCurrentSegment] = useState<Partial<Segment>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    segmentId: '',
    segmentName: '',
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  console.log('Users:', users);
  console.log('Search term:', searchTerm);
  console.log('Search results:', searchResults);
  console.log('Selected attributes:', selectedAttributes);
  console.log('Filters:', filters);
  console.log('Saved segments:', segments);
  console.log('Current segment:', currentSegment);
  console.log('Is modal open:', isModalOpen);
  console.log('Has unsavedChanges:', hasUnsavedChanges);
  console.log('deleteModal:', deleteModal);

  const fetchUsers = async () => {
    try {
      await listUsers();
    } catch (error) {
      console.error('Error loading users data:', error);
    }
  };

  const fetchSegments = async () => {
    try {
      await listSegments();
    } catch (error) {
      console.error('Error loading segments data:', error);
    }
  };

  useEffect(() => {
    setDeleteModal({ isOpen: false, segmentId: '', segmentName: '' });
    setIsModalOpen(false);
    setSearchTerm('');

    fetchUsers();
    fetchSegments();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filtered = useMemo(() => {
    console.log('Filtering and searching...');
    let filtered = users;

    // Apply filters
    filtered = filtered.filter((user) => {
      return Object.keys(filters).every((attribute) => {
        const filter = filters[attribute as Attributes];
        const userAttribute =
          CustomerAttributes.find(
            (customerAttribute) => customerAttribute.label === attribute
          )?.key ?? '';
        let value = user[userAttribute as keyof User];

        const { operator } = filter ?? {};
        let { filterValue } = filter ?? {};

        if (
          !operator ||
          operator.length === 0 ||
          !filterValue ||
          filterValue.length === 0
        ) {
          return true;
        }

        switch (userAttribute) {
          case 'registered_at':
          case 'last_seen':
          case 'logged_in_at':
          case 'company_created_at': {
            value = moment(value?.toString()).unix().toString();
            filterValue = moment(filterValue.toString()).unix().toString();
            break;
          }
          default:
            break;
        }

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
    if (searchTerm.length > 0) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((user) =>
        Object.keys(selectedAttributes).some((attribute) => {
          if (selectedAttributes?.[attribute as Attributes]) {
            const value = user[attribute as keyof User];
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
    setCurrentSegment(undefined);
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
    const newSegment: Partial<Segment> = {
      name: segmentName,
      filters: filters,
      selectedAttributes: selectedAttributes,
    };

    try {
      await addSegment(newSegment);
      setCurrentSegment(newSegment);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  const handleUpdateSegment = async () => {
    if (!currentSegment) return;

    const updatedSegment: Partial<Segment> = {
      id: currentSegment.id,
      name: currentSegment.name,
      filters: filters,
      selectedAttributes: selectedAttributes,
    };

    try {
      await updateSegment(updatedSegment);
      setCurrentSegment(updatedSegment);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error updating segment:', error);
    }
  };

  const handleDeleteSegment = async (id: number) => {
    try {
      await deleteSegment(id).finally(() => handleClear());
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
    <div className="flex" style={{ height: 'calc(100vh - 60px)' }}>
      <AttributeSidebar
        onFilterChange={handleFilterChange}
        onClear={handleClear}
        currentSelectedAttributes={selectedAttributes}
        currentFilters={filters}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <div
        className="flex flex-col w-full"
        style={{
          minWidth: `${screenWidth - 475}px`,
          maxWidth: `${screenWidth - 475}px`,
        }}
      >
        <SegmentHeader
          onSaveSegment={handleSaveSegment}
          onUpdateSegment={handleUpdateSegment}
          onSaveAsNewSegment={() => {}}
          savedSegments={segments}
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
