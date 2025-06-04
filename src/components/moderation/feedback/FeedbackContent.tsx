import { FeedbackList } from './FeedbackList';
import { AlertCircle, Loader } from 'lucide-react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { useRejectFeedback } from '../../../hooks/useRejectFeedback';
import { RejectFeedbackModal } from './RejectFeedbackModal';
import { Feedback } from '../../../types/feedback';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import queryString from 'query-string';
import { useUserNotification } from '../../../contexts/UserNotificationContext';
import { clearQueryString } from '../../../utils/uri';
import { putApi } from '../../../utils/api/api';
import { Notification } from '../../../types/notification';

export function FeedbackContent() {
  const location = useLocation();

  const { state, updateItemStatus } = useFeedback();
  const { ideasForApproval, loading, error, activeTab } = state;
  const {
    state: {
      userNotification: { notifications },
    },
    updateNotification,
  } = useUserNotification();
  const { itemToReject, handleReject, handleConfirmReject, cancelReject } =
    useRejectFeedback();

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);
      if (Number(params['notification_id'])) {
        const notification = notifications.find(
          (notification) =>
            notification.id === Number(params['notification_id'])
        );
        if (notification) {
          putApi<Notification>(
            `notifications/${Number(params['notification_id'])}`,
            { ...notification, is_read: true }
          ).then((res) => {
            const {
              results: { data },
            } = res;
            if (data) {
              updateNotification(data);
            }
          });
        }
      }

      clearQueryString();
    }
  }, [notifications.length]);

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

  if (activeTab === 'ideas' && ideasForApproval.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items to review</p>
      </div>
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
