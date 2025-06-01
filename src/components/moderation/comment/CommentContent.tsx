import { AlertCircle, Loader } from 'lucide-react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { FeedbackComment } from '../../../types/feedback';
import { CommentList } from './CommentList';
import { RejectCommentModal } from './RejectCommentModal';
import { useRejectComment } from '../../../hooks/useRejectComment';

export function CommentContent() {
  const { state, updateCommentStatus } = useFeedback();
  const { commentsForApproval, loading, error, activeTab } = state;
  const { itemToReject, handleReject, handleConfirmReject, cancelReject } =
    useRejectComment();

  const handleApprove = async (item: Partial<FeedbackComment>) => {
    await updateCommentStatus({ ...item, admin_approval_status: 'approved' });
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

  if (activeTab === 'comments' && commentsForApproval.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items to review</p>
      </div>
    );
  }

  return (
    <>
      <CommentList
        items={commentsForApproval}
        onReject={handleReject}
        onApprove={handleApprove}
      />

      {itemToReject && (
        <RejectCommentModal
          type={activeTab === 'ideas' ? 'idea' : 'comment'}
          item={itemToReject}
          onConfirm={(reason) => handleConfirmReject(reason)}
          onCancel={cancelReject}
        />
      )}
    </>
  );
}
