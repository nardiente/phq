import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import EffortIndicator from '../EffortIndicator';
import StatusBadge from '../StatusBadge';
import { usePanel } from '../../contexts/PanelContext';
import {
  Confidence,
  Confidences,
  Efforts,
  Feedback,
  Impact,
  Impacts,
} from '../../types/feedback';
import { useFeedback } from '../../contexts/FeedbackContext';
import { putApi } from '../../utils/api/api';
import { useSocket } from '../../contexts/SocketContext';
import { useUser } from '../../contexts/UserContext';
import { SocketAction } from '../../types/socket';

interface TableRowProps {
  item: Feedback;
  onItemChange: (item: Feedback) => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, onItemChange }) => {
  const { setIsOpen, setActivePage } = usePanel();
  const { setSelectedIdea, updateIdea } = useFeedback();
  const {
    state: { socket },
  } = useSocket();
  const { user: userContext } = useUser();
  const { project, user } = userContext ?? {};

  const [isImpactOpen, setIsImpactOpen] = useState(false);
  const [isConfidenceOpen, setIsConfidenceOpen] = useState(false);
  const impactRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'error' | null
  >(null);

  const calculateScore = (updatedItem: Feedback) => {
    const reach = updatedItem.reach || 0;
    const impact = Number(updatedItem.impact) || 0;
    const confidence = (updatedItem.confidence ?? Confidences.LOW) / 100 || 0;
    const effort = updatedItem.effort || 1;

    return Math.round((reach * impact * confidence) / effort);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        impactRef.current &&
        !impactRef.current.contains(event.target as Node)
      ) {
        setIsImpactOpen(false);
      }
      if (
        confidenceRef.current &&
        !confidenceRef.current.contains(event.target as Node)
      ) {
        setIsConfidenceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const impactOptions = [
    { value: Impacts.MASSIVE, label: Impact[Impacts.MASSIVE] },
    { value: Impacts.HIGH, label: Impact[Impacts.HIGH] },
    { value: Impacts.MEDIUM, label: Impact[Impacts.MEDIUM] },
    { value: Impacts.LOW, label: Impact[Impacts.LOW] },
    { value: Impacts.MINIMAL, label: Impact[Impacts.MINIMAL] },
  ];

  const confidenceOptions = [
    { label: Confidence[Confidences.LOW], value: Confidences.LOW },
    { label: Confidence[Confidences.MEDIUM], value: Confidences.MEDIUM },
    { label: Confidence[Confidences.HIGH], value: Confidences.HIGH },
  ];

  const calculateDropdownPosition = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  };

  const defaultImpact =
    impactOptions.find((option) => option.label === Impact[Impacts.MEDIUM])
      ?.value || 1;
  const defaultConfidence = Confidence[Confidences.LOW];

  const scoreStyle: React.CSSProperties = {
    color: '#5a00cd',
    fontSize: '1.1em',
    verticalAlign: 'middle',
    textAlign: 'center' as const,
  };

  const saveItemToServer = async (updatedItem: Feedback) => {
    const {
      title,
      description,
      estimated_release_date,
      status,
      tags,
      reach,
      impact,
      confidence,
      effort,
      score,
    } = updatedItem;
    setSaveStatus('saving');
    putApi<Feedback>(`feedback/${updatedItem.id}`, {
      title,
      description,
      estimated_release_date,
      status_name: status?.name ?? 'Under Review',
      tags,
      reach,
      impact,
      confidence,
      effort,
      score,
    })
      .then((res) => {
        const {
          results: { data, error, errors },
        } = res;
        if (error || errors) {
          setSaveStatus('error');
        }
        if (data) {
          updateIdea(data);
          setSaveStatus('saved');
          socket?.emit('message', {
            action: SocketAction.UPDATE_IDEA,
            data: {
              idea: data,
              user_id: user?.id,
              projectId: project?.id,
            },
          });
        }
      })
      .catch(() => setSaveStatus('error'))
      .finally(() => setTimeout(() => setSaveStatus(null), 2000));
  };

  const handleItemUpdate = (updatedItem: Feedback) => {
    onItemChange(updatedItem);
    saveItemToServer(updatedItem);
  };

  const handleNameClick = () => {
    setSelectedIdea(item);
    setActivePage('add_comment');
    setIsOpen(true);
  };

  return (
    <tr className="border-b last:border-b-0">
      <td
        className="py-4 px-4 text-gray-700 text-sm"
        style={{ width: '300px', verticalAlign: 'middle' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="cursor-pointer hover:text-purple-600"
            onClick={handleNameClick}
          >
            {item.title}
          </span>
          {saveStatus && (
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                saveStatus === 'saving'
                  ? 'bg-blue-50 text-blue-700'
                  : saveStatus === 'saved'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              {saveStatus === 'saving'
                ? 'Saving'
                : saveStatus === 'saved'
                  ? 'Saved'
                  : 'Error'}
            </span>
          )}
        </div>
      </td>
      <td
        className="py-4 px-4 text-gray-700 w-32 text-sm"
        style={{ verticalAlign: 'middle' }}
      >
        <StatusBadge status={item.status?.name.toString() ?? ''} />
      </td>
      <td
        className="py-4 px-4 text-gray-700 w-24 text-sm"
        style={{ verticalAlign: 'middle' }}
      >
        <input
          type="text"
          inputMode="numeric"
          value={item.reach || ''}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value === '' ? 0 : parseInt(value);
            if (value === '' || !isNaN(numericValue)) {
              const updatedItem = { ...item, reach: numericValue };
              updatedItem.score = calculateScore(updatedItem);
              onItemChange(updatedItem);
            }
          }}
          onKeyDown={(e) => {
            if (e.code.includes('Enter')) {
              handleItemUpdate(item);
            }
          }}
          className="w-full p-1 border rounded-lg text-gray-700 text-sm"
        />
      </td>
      <td
        className="py-4 px-4 text-gray-700 relative text-sm"
        style={{ verticalAlign: 'middle', width: '130px' }}
      >
        <div className="relative border rounded-lg" ref={impactRef}>
          <button
            onClick={() => {
              const position = calculateDropdownPosition(impactRef);
              setDropdownPosition(position);
              setIsImpactOpen(!isImpactOpen);
            }}
            className="w-full p-1 flex items-center justify-between text-gray-700 text-sm"
          >
            <span>
              {impactOptions.find(
                (option) =>
                  option.value ===
                  (item.impact === undefined ? defaultImpact : item.impact)
              )?.value +
                ' ' +
                impactOptions.find(
                  (option) =>
                    option.value ===
                    (item.impact === undefined ? defaultImpact : item.impact)
                )?.label || Impact[Impacts.MEDIUM]}
            </span>
            <ChevronDown className="w-5 h-5" />
          </button>
          {isImpactOpen && (
            <div
              style={{
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 9999,
                width: '144px',
              }}
              className="mt-1 w-full bg-white rounded-lg shadow-lg border"
            >
              {impactOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const updatedItem = { ...item, impact: option.value };
                    updatedItem.score = calculateScore(updatedItem);
                    handleItemUpdate(updatedItem);
                    setIsImpactOpen(false);
                  }}
                  className="w-full px-2 py-1 text-left hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {option.value + ' ' + option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td
        className="py-4 px-4 text-gray-700 relative text-sm"
        style={{ verticalAlign: 'middle', width: '160px' }}
      >
        <div className="relative border rounded-lg w-full" ref={confidenceRef}>
          <button
            onClick={() => {
              const position = calculateDropdownPosition(confidenceRef);
              setDropdownPosition(position);
              setIsConfidenceOpen(!isConfidenceOpen);
            }}
            className="w-full p-1 flex items-center justify-between text-gray-700 text-sm"
          >
            <span>
              {item.confidence === undefined
                ? defaultConfidence
                : Confidence[item.confidence]}
            </span>
            <ChevronDown className="w-5 h-5" />
          </button>
          {isConfidenceOpen && (
            <div
              style={{
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 9999,
                width: '160px',
              }}
              className="mt-1 w-full bg-white rounded-lg shadow-lg border"
            >
              {confidenceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const updatedItem = { ...item, confidence: option.value };
                    updatedItem.score = calculateScore(updatedItem);
                    handleItemUpdate(updatedItem);
                    setIsConfidenceOpen(false);
                  }}
                  className="w-full px-2 py-1 text-left hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td
        className="py-4 px-4 text-gray-700 w-24 text-sm"
        style={{ verticalAlign: 'middle' }}
      >
        <EffortIndicator
          level={Efforts.indexOf(item.effort ?? 1) + 1}
          onChange={(level) => {
            const effortValue = Efforts[level - 1];
            const updatedItem = { ...item, effort: effortValue };
            updatedItem.score = calculateScore(updatedItem);
            handleItemUpdate(updatedItem);
          }}
        />
      </td>
      <td className="py-4 px-4 text-sm w-16" style={scoreStyle}>
        {item.score}
      </td>
    </tr>
  );
};

export default TableRow;
