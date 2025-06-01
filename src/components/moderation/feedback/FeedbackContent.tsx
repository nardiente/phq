import { FeedbackList } from '../FeedbackList';
import { AlertCircle, Loader } from 'lucide-react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { useRejectFeedback } from '../../../hooks/useRejectFeedback';
import { RejectFeedbackModal } from '../RejectFeedbackModal';
import { Feedback } from '../../../types/feedback';

export function FeedbackContent() {
  const { state, setIdeasForApproval, updateItemStatus } = useFeedback();
  const { filteredIdeas, ideas, ideasForApproval, loading, error, activeTab } =
    state;
  const { itemToReject, handleReject, handleConfirmReject, cancelReject } =
    useRejectFeedback();

  const handleApprove = async (item: Partial<Feedback>) => {
    await updateItemStatus({ ...item, admin_approval_status: 'approved' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-red-600">
        <AlertCircle size={16} />
        <p>{error}</p>
      </div>
    );
  }

  if (filteredIdeas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items to review</p>
      </div>
    );
  }
  if (ideasForApproval.length === 0 && ideas.length > 0) {
    setIdeasForApproval(
      ideas.filter((idea) => idea.admin_approval_status === 'pending')
    );
  }

  return (
    <>
      <FeedbackList
        items={ideasForApproval}
        onReject={handleReject}
        onApprove={handleApprove}
      />

      {itemToReject && (
        <RejectFeedbackModal
          type={activeTab === 'ideas' ? 'idea' : 'comment'}
          item={itemToReject}
          onConfirm={(reason) => handleConfirmReject(reason)}
          onCancel={cancelReject}
        />
      )}
    </>
  );
}
