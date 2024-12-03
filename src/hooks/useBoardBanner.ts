import { useState, useEffect } from 'react';

const STORAGE_KEY = 'board_banner_state';
const HIDE_UNTIL_KEY = 'board_banner_hide_until';

interface BannerState {
  permanentlyHidden: boolean;
  temporarilyHidden: boolean;
  hideUntil: number | null;
}

export function useBoardBanner() {
  const [state, setState] = useState<BannerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      permanentlyHidden: false,
      temporarilyHidden: false,
      hideUntil: null
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.hideUntil && Date.now() > state.hideUntil) {
      setState(prev => ({ ...prev, temporarilyHidden: false, hideUntil: null }));
    }
  }, [state.hideUntil]);

  const hidePermanently = () => {
    setState(prev => ({ ...prev, permanentlyHidden: true }));
  };

  const hideTemporarily = () => {
    const hideUntil = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    setState(prev => ({ 
      ...prev, 
      temporarilyHidden: true,
      hideUntil
    }));
  };

  const isVisible = !state.permanentlyHidden && !state.temporarilyHidden;

  return {
    isVisible,
    hideTemporarily,
    hidePermanently
  };
}