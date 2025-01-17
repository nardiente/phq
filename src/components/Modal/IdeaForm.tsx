import { useState } from 'react';
import StatusDropdown from './StatusDropdown';
import DatePicker from './DatePicker';
import Tag from './Tag';
import { IdeaFormData, RoadmapItem } from '../../types/roadmap';

interface IdeaFormProps {
  onSave: (idea: IdeaFormData) => void;
  onClose: () => void;
}

const IdeaForm = ({ onSave, onClose }: IdeaFormProps) => {
  const [formData, setFormData] = useState<IdeaFormData>({
    name: '',
    description: '',
    status: 'In Progress',
    estimatedDate: '',
    tags: [],
  });

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-full p-4 border rounded-lg"
        placeholder="Enter idea title"
      />

      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full p-4 border rounded-lg min-h-[200px] resize-none"
        placeholder="Enter description"
      />

      <div>
        <p className="text-sm text-gray-600 mb-2">
          Select up to 3 tags related to this idea (optional)
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Tag label="Feature Request" active />
          <Tag label="Bug" />
          <Tag label="Styling" />
          <Tag label="Nice-to-have" />
          <Tag label="Hello" />
          <Tag label="Tag5" />
          <Tag label="Tag6" />
          <Tag label="Tag7" />
        </div>
        <button className="text-purple-600 text-sm">Manage tags</button>
      </div>

      <div>
        <p className="font-medium mb-2">Status</p>
        <StatusDropdown
          value={formData.status}
          onChange={(status) =>
            setFormData((prev) => ({
              ...prev,
              status: status as RoadmapItem['status'],
            }))
          }
        />
      </div>

      <div>
        <p className="font-medium mb-2">Estimated</p>
        <DatePicker
          value={formData.estimatedDate}
          onChange={(date) =>
            setFormData((prev) => ({ ...prev, estimatedDate: date }))
          }
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-lg border hover:bg-gray-50"
        >
          Discard
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-lg text-white bg-[#ff6334] hover:opacity-90"
        >
          Save idea
        </button>
      </div>
    </div>
  );
};

export default IdeaForm;
