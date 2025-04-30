import moment from 'moment';
import { useFeedback } from '../../../contexts/FeedbackContext';
import StatusBadge from '../../StatusBadge';

export const IdeasList = () => {
  const {
    state: { filteredIdeas },
  } = useFeedback();

  return (
    <div className="space-y-4">
      {filteredIdeas.map((idea, index) => (
        <div key={index} className="flex gap-4 text-gray-900">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xl">
            {idea.vote}
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">{idea.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{idea.description}</p>
            <div className="flex items-center gap-4 text-sm text-outlined-badge-text2">
              <span>{idea.author?.full_name}</span>
              <span>{moment(idea.created_at).format('MMM D, YYYY')}</span>
              <StatusBadge status={idea.status?.name ?? ''} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
