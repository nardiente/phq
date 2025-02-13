import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { RoadmapItem } from '../../types/roadmap';
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
  const { user } = useUser();

  const [isImpactOpen, setIsImpactOpen] = useState(false);
  const [isConfidenceOpen, setIsConfidenceOpen] = useState(false);
  const impactRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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
    { value: 3, label: 'massive' },
    { value: 2, label: 'high' },
    { value: 1, label: 'medium' },
    { value: 0.5, label: 'low' },
    { value: 0.25, label: 'minimal' },
  ];

  const calculateDropdownPosition = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  };

  const defaultImpact = impactOptions.find(option => option.label === 'medium')?.value || 1;

  console.log('item.impact:', item.impact);
  console.log('impactOptions:', impactOptions);
  console.log('defaultImpact:', defaultImpact);

  const capitalize = (str: string) => {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const scoreStyle = {
    color: '#5a00cd',
    fontSize: '1.1em',
    verticalAlign: 'middle',
    textAlign: 'center'
  };

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2 px-3 text-gray-700 text-sm" style={{width: '300px', verticalAlign: 'middle'}}>{item.name}</td>
      <td className="py-2 px-3 text-gray-700 w-32 text-sm" style={{verticalAlign: 'middle'}}>
        <StatusBadge status={item.status} />
      </td>
      <td className="py-2 px-3 text-gray-700 w-24 text-sm" style={{verticalAlign: 'middle'}}>
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
          className="w-full p-1 border rounded-lg text-gray-700 text-sm"
        />
      </td>
      <td className="py-2 px-3 text-gray-700 relative w-32 text-sm" style={{verticalAlign: 'middle'}}>
        <div className="relative" ref={impactRef}>
          <button
            onClick={() => {
              const position = calculateDropdownPosition(impactRef);
              setDropdownPosition(position);
              setIsImpactOpen(!isImpactOpen);
            }}
            className="w-full p-1 border rounded-lg flex items-center justify-between text-gray-700 text-sm"
          >
            <span>
              {impactOptions.find((option) => option.value === item.impact)?.value + " " + capitalize(impactOptions.find((option) => option.value === item.impact)?.label || 'medium') }
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
                  className="w-full px-2 py-1 text-left hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {option.value + " " + capitalize(option.label)}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="py-2 px-3 text-gray-700 relative w-32 text-sm" style={{verticalAlign: 'middle'}}>
        <div className="relative" ref={confidenceRef}>
          <button
            onClick={() => {
              const position = calculateDropdownPosition(confidenceRef);
              setDropdownPosition(position);
              setIsConfidenceOpen(!isConfidenceOpen);
            }}
            className="w-full p-1 border rounded-lg flex items-center justify-between text-gray-700 text-sm"
          >
            <span>{item.confidence.replace(/-/g, '')}</span>
            <ChevronDown className="w-5 h-5" />
          </button>
          {isConfidenceOpen && (
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
              {['50% - Low', '80% - Medium', '100% - High'].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const updatedItem = { ...item, confidence: option.value };
                    updatedItem.score = calculateScore(updatedItem);
                    handleItemUpdate(updatedItem);
                    setIsConfidenceOpen(false);
                  }}
                  className="w-full px-2 py-1 text-left hover:bg-gray-50 text-gray-700 text-sm"
                  className="w-full px-2 py-1 text-left hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {option.replace(/-/g, '')}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="py-2 px-3 text-gray-700 w-24 text-sm" style={{verticalAlign: 'middle'}}>
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
      <td className="py-2 px-3 text-sm w-16" style={scoreStyle}>{item.score}</td>
    </tr>
  );
};

export default TableRow;
