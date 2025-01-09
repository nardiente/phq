import { FeedbackList } from '../FeedbackList';
import { AlertCircle } from 'lucide-react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { useRejectFeedback } from '../../../hooks/useRejectFeedback';
import { RejectFeedbackModal } from '../RejectFeedbackModal';

export function FeedbackContent() {
  const { state, updateItemStatus } = useFeedback();
  const { items, loading, error, activeTab } = state;
  const { itemToReject, handleReject, handleConfirmReject, cancelReject } =
    useRejectFeedback();

  const handleApprove = async (item: any) => {
    await updateItemStatus(item.id, 'approved');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading...</p>
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

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items to review</p>
      </div>
    );
  }

  return (
    <>
      <FeedbackList
        items={items}
        onReject={handleReject}
        onApprove={handleApprove}
      />

      {itemToReject && (
        <RejectFeedbackModal
          type={activeTab === 'ideas' ? 'idea' : 'comment'}
          item={itemToReject}
          onConfirm={async (reason) => {
            await updateItemStatus(itemToReject.id ?? 0, 'rejected');
            handleConfirmReject(reason);
          }}
          onCancel={cancelReject}
        />
      )}
    </>
  );
}
