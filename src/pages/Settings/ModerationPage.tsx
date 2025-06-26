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
import SectionHeader from '../../components/SectionHeader';
import { useUser } from '../../contexts/UserContext';
import { SocketAction } from '../../types/socket';

export default function ModerationPage() {
  const navigate = useNavigate();

  const {
    state: { socket },
  } = useSocket();
  const { initialUser, user, setUser } = useUser();
  const { project } = user ?? {};
  const { moderation } = user ?? {
    id: 0,
    allow_anonymous_access: false,
    moderate_settings: {
      feedback: true,
      votes: true,
      comments: true,
    },
    project_id: project?.id ?? 0,
    user_feedback: true,
  };

  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => getModeration(), []);

  const getModeration = () => {
    setFetching(true);
    getApi<{ message: string; data: Moderation }>({ url: 'users/moderation' })
      .then((res) => {
        if (res.results.data) {
          setUser((prev) =>
            prev
              ? { ...prev, moderation: res.results.data?.data }
              : { ...initialUser, moderation: res.results.data?.data }
          );
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
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
          if (data.data.notified === true) {
            socket?.emit('message', {
              action: SocketAction.UPDATE_MODERATION,
              data: {
                moderation: data.data,
                projectId: data.data.project_id,
              },
            });
          }
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Settings>
      <SettingsHeader
        title="Account Settings"
        primaryButton={
          <Button
            disabled={fetching || loading}
            loading={loading}
            onClick={handleUpdate}
          >
            <div className="text-white">{`Updat${loading ? 'ing...' : 'e'}`}</div>
          </Button>
        }
        secondaryButton={
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Cancel
          </Button>
        }
      />
      <SettingsContainer>
        <div className="flex flex-col gap-6">
          <SectionHeader title="Moderation" />

          <TurnoffUserLogin
            enabled={moderation?.allow_anonymous_access ?? false}
            onChange={(enabled) =>
              setUser((prev) => {
                prev = prev ?? initialUser;
                if (prev.moderation) {
                  return {
                    ...prev,
                    moderation: {
                      ...prev.moderation,
                      allow_anonymous_access: enabled,
                    },
                  };
                }
                return prev;
              })
            }
          />

          <UserFeedbackSettings
            settings={moderation?.moderate_settings}
            onChange={(key, value) =>
              setUser((prev) => {
                prev = prev ?? initialUser;
                if (prev.moderation) {
                  prev = {
                    ...prev,
                    moderation: {
                      ...prev.moderation,
                      moderate_settings: {
                        ...prev.moderation.moderate_settings,
                        [key]: value,
                      },
                    },
                  };
                }
                return prev;
              })
            }
          />

          <FeedbackApprovalSection />
        </div>
      </SettingsContainer>
    </Settings>
  );
}
