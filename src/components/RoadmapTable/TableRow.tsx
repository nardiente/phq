import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { RoadmapItem } from '../../types/roadmap';
import EffortIndicator from '../EffortIndicator';
import StatusBadge from '../StatusBadge';

interface TableRowProps {
  item: RoadmapItem;
  onItemChange: (item: RoadmapItem) => void;
}

const TableRow = ({ item, onItemChange }: TableRowProps) => {
  const [isImpactOpen, setIsImpactOpen] = useState(false);
  const [isConfidenceOpen, setIsConfidenceOpen] = useState(false);
  const impactRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLDivElement>(null);

  const calculateScore = (updatedItem: RoadmapItem) => {
    const reach = updatedItem.reach || 0;
    const impact = Number(updatedItem.impact) || 0;
    const confidence = parseFloat(updatedItem.confidence) / 100 || 0;
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

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-4 px-6 text-sm text-gray-500">{item.id}</td>
      <td className="py-4 px-6">{item.name}</td>
      <td className="py-4 px-6">
        <StatusBadge status={item.status} />
      </td>
      <td className="py-4 px-6 text-sm text-gray-500">{item.estimatedDate}</td>
      <td className="py-4 px-6">
        <input
          type="text"
          inputMode="numeric"
          value={item.reach || ''}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value === '' ? 0 : parseInt(value);
            if (value === '' || !isNaN(numericValue)) {
              const updatedItem = {
                ...item,
                reach: numericValue,
              };
              updatedItem.score = calculateScore(updatedItem);
              onItemChange(updatedItem);
            }
          }}
          className="w-24 p-2 border rounded-lg"
        />
      </td>
      <td className="py-4 px-6">
        <div className="relative" ref={impactRef}>
          <button
            onClick={() => setIsImpactOpen(!isImpactOpen)}
            className="w-36 p-2 border rounded-lg flex items-center justify-between"
          >
            <span>
              {item.impact === '1-5'
                ? '1-5'
                : `${item.impact} ${
                    item.impact === 3
                      ? 'massive'
                      : item.impact === 2
                        ? 'high'
                        : item.impact === 1
                          ? 'medium'
                          : item.impact === 0.5
                            ? 'low'
                            : 'minimal'
                  }`}
            </span>
            <ChevronDown className="w-5 h-5" />
          </button>
          {isImpactOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border">
              {[
                { value: 3, label: 'massive' },
                { value: 2, label: 'high' },
                { value: 1, label: 'medium' },
                { value: 0.5, label: 'low' },
                { value: 0.25, label: 'minimal' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const updatedItem = {
                      ...item,
                      impact: option.value,
                    };
                    updatedItem.score = calculateScore(updatedItem);
                    onItemChange(updatedItem);
                    setIsImpactOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  {option.value} {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="relative" ref={confidenceRef}>
          <button
            onClick={() => setIsConfidenceOpen(!isConfidenceOpen)}
            className="w-36 p-2 border rounded-lg flex items-center justify-between"
          >
            <span>{item.confidence}</span>
            <ChevronDown className="w-5 h-5" />
          </button>
          {isConfidenceOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border">
              {['50% - Low', '80% - Medium', '100% - High'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    const updatedItem = {
                      ...item,
                      confidence: option,
                    };
                    updatedItem.score = calculateScore(updatedItem);
                    onItemChange(updatedItem);
                    setIsConfidenceOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <EffortIndicator
          level={[1, 3, 5, 8, 13].indexOf(item.effort) + 1}
          onChange={(level) => {
            const effortValue = [1, 3, 5, 8, 13][level - 1];
            const updatedItem = {
              ...item,
              effort: effortValue,
            };
            updatedItem.score = calculateScore(updatedItem);
            onItemChange(updatedItem);
          }}
        />
      </td>
      <td className="py-4 px-6 text-sm">{item.score}</td>
    </tr>
  );
};

export default TableRow;
