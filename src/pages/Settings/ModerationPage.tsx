import { useEffect, useState } from 'react';
import { TurnoffUserLogin } from '../../components/moderation/TurnoffUserLogin';
import { UserFeedbackSettings } from '../../components/moderation/UserFeedbackSettings';
import { FeedbackApprovalSection } from '../../components/moderation/FeedbackApprovalSection';
import { getApi, putApi } from '../../utils/api/api';
import { Moderation } from '../../types/moderation';
import { toast } from 'react-toastify';
import { useSocket } from '../../contexts/SocketContext';
import { useNavigate } from 'react-router-dom';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import { ComingSoonLayout } from '../../components/ComingSoonLayout';

export default function ModerationPage() {
  const navigate = useNavigate();

  const {
    state: { socket },
  } = useSocket();

  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [moderation, setModeration] = useState<Moderation>({
    id: 0,
    moderate_settings: {
      feedback: true,
      votes: true,
      comments: true,
    },
    user_feedback: true,
    user_login: false,
    user_id: 0,
  });

  useEffect(() => getModeration(), []);

  const getModeration = () => {
    setFetching(true);
    getApi<{ message: string; data: Moderation }>({ url: 'users/moderation' })
      .then((res) => {
        if (res.results.data) {
          setModeration(res.results.data.data);
        }
      })
      .finally(() => setFetching(false));
  };

  const handleUpdate = () => {
    setLoading(true);
    putApi<{
      message: string;
      data: Moderation & { notified?: boolean };
    }>('users/moderation', moderation)
      .then((res) => {
        if (res.results.data?.data) {
          const data = res.results.data;
          toast(data.message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'custom-theme',
          });
          if (data.data.notified === true) {
            console.log('SettingsModerationPage handleUpdate socket:', socket);
            socket?.current?.send(
              JSON.stringify({
                action: 'updateNotification',
                user_id: data.data.user_id,
              })
            );
          }
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <ComingSoonLayout>
      <Settings>
        <SettingsHeader
          title="Account Settings"
          primaryButton={
            <Button
              text="Update"
              disabled={fetching || loading}
              onClick={handleUpdate}
            />
          }
          secondaryButton={
            <Button
              text="Cancel"
              onClick={() => navigate('/dashboard')}
              variant="secondary"
            />
          }
        />
        <SettingsContainer>
          <h2 className="text-[16px] font-semibold text-gray-900">
            Moderation
          </h2>
          <div className="space-y-8">
            <TurnoffUserLogin
              enabled={moderation.user_login}
              onChange={(enabled) =>
                setModeration((prev) => ({
                  ...prev,
                  user_login: enabled,
                }))
              }
            />

            <UserFeedbackSettings
              settings={moderation.moderate_settings}
              onChange={(key, value) =>
                setModeration((prev) => ({
                  ...prev,
                  moderate_settings: {
                    ...prev.moderate_settings,
                    [key]: value,
                  },
                }))
              }
            />

            <FeedbackApprovalSection />
          </div>
        </SettingsContainer>
      </Settings>
    </ComingSoonLayout>
  );
}
