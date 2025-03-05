import { useState, useEffect } from 'react';
import { putApi } from '../utils/api/api';
import { useUser } from '../contexts/UserContext';
import moment from 'moment';
import { User } from '../types/user';

const STORAGE_KEY = 'board_banner_state';

interface BannerState {
  permanentlyHidden: boolean;
  temporarilyHidden: boolean;
  hideUntil: string | null;
}

export function useBoardBanner() {
  const { user: userDetails } = useUser();
  const { project, user } = userDetails ?? {};
  const { remind_3_days, remind_3_days_timestamp, stop_remind_add_board } =
    user ?? {};

  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<BannerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          permanentlyHidden: false,
          temporarilyHidden: false,
          hideUntil: null,
        };
  });

  useEffect(() => {
    if (project?.id) {
      setState((prev) => ({
        ...prev,
        permanentlyHidden: stop_remind_add_board === true,
        temporarilyHidden: remind_3_days === true,
        hideUntil:
          remind_3_days && remind_3_days_timestamp
            ? moment(remind_3_days_timestamp).add(4320, 'minutes').toISOString()
            : null,
      }));
    }
  }, [project]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (
      remind_3_days &&
      moment().diff(moment(remind_3_days_timestamp), 'minutes') >= 4320
    ) {
      putApi('users/me', { remind_3_days: false }).then((res) => {
        if (res.results.data) {
          setState((prev) => ({
            ...prev,
            temporarilyHidden: false,
            hideUntil: null,
          }));
        }
      });
    }
  }, [remind_3_days]);

  const hidePermanently = () => {
    setLoading(true);
    putApi('users/me', { stop_remind_add_board: true })
      .then((res) => {
        if (res.results.data) {
          setState((prev) => ({ ...prev, permanentlyHidden: true }));
        }
      })
      .finally(() => setLoading(false));
  };

  const hideTemporarily = () => {
    setLoading(true);
    putApi<User>('users/me', { remind_3_days: true })
      .then((res) => {
        const { results } = res;
        const { data } = results ?? {};
        if (data) {
          const { remind_3_days, remind_3_days_timestamp } = data ?? {};
          setState((prev) => ({
            ...prev,
            temporarilyHidden: remind_3_days === true,
            hideUntil:
              remind_3_days && remind_3_days_timestamp
                ? moment(remind_3_days_timestamp)
                    .add(4320, 'minutes')
                    .toISOString()
                : null,
          }));
        }
      })
      .finally(() => setLoading(false));
  };

  const isVisible = !state.permanentlyHidden && !state.temporarilyHidden;

  return {
    isVisible,
    loading,
    hideTemporarily,
    hidePermanently,
  };
}
