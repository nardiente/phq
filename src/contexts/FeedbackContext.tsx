import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { FeedbackItem } from '../types/feedback';

interface FeedbackState {
  items: FeedbackItem[];
  activeTab: 'ideas' | 'comments';
  loading: boolean;
  error: string | null;
}

type FeedbackAction = 
  | { type: 'SET_ITEMS'; payload: FeedbackItem[] }
  | { type: 'SET_TAB'; payload: 'ideas' | 'comments' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_ITEM_STATUS'; payload: { id: string; status: 'approved' | 'rejected' } };

interface FeedbackContextType {
  state: FeedbackState;
  setActiveTab: (tab: 'ideas' | 'comments') => Promise<void>;
  updateItemStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
}

const initialState: FeedbackState = {
  items: [],
  activeTab: 'ideas',
  loading: false,
  error: null
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const mockItems = {
  ideas: [
    {
      id: '1',
      title: 'Add dark mode support',
      content: 'It would be great to have a dark mode option for better visibility in low-light conditions. This would help reduce eye strain during night-time usage.',
      author: 'Sarah Chen',
      date: 'Mar 15, 2024',
      tag: 'Enhancement'
    },
    {
      id: '2',
      title: 'Bulk action support',
      content: 'Please add the ability to perform actions on multiple items at once. This would save a lot of time when managing large numbers of items.',
      author: 'Michael Park',
      date: 'Mar 14, 2024',
      tag: 'Feature'
    },
    {
      id: '3',
      title: 'Export data to CSV',
      content: 'Would love to have the ability to export our data to CSV format for further analysis in spreadsheet software.',
      author: 'Emma Rodriguez',
      date: 'Mar 13, 2024',
      tag: 'Feature'
    }
  ],
  comments: [
    {
      id: '4',
      title: 'Re: Mobile responsiveness',
      content: 'The mobile experience could be improved. The buttons are too small to tap accurately on my phone.',
      author: 'David Kim',
      date: 'Mar 15, 2024'
    },
    {
      id: '5',
      title: 'Re: Search functionality',
      content: 'The new search feature is great, but it would be even better if we could filter by date range.',
      author: 'Lisa Thompson',
      date: 'Mar 14, 2024'
    },
    {
      id: '6',
      title: 'Re: Dashboard widgets',
      content: 'Love the new dashboard layout! One suggestion: allow us to resize the widgets for better customization.',
      author: 'James Wilson',
      date: 'Mar 13, 2024'
    }
  ]
};

function feedbackReducer(state: FeedbackState, action: FeedbackAction): FeedbackState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_ITEM_STATUS':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  const fetchItems = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const items = mockItems[tab];
      dispatch({ type: 'SET_ITEMS', payload: items });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to load feedback items. Please try again.' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setActiveTab = async (tab: 'ideas' | 'comments') => {
    dispatch({ type: 'SET_TAB', payload: tab });
    await fetchItems(tab);
  };

  const updateItemStatus = async (id: string, status: 'approved' | 'rejected') => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ 
        type: 'UPDATE_ITEM_STATUS', 
        payload: { id, status } 
      });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: `Failed to ${status} item. Please try again.` 
      });
    }
  };

  const value = useMemo(() => ({
    state,
    setActiveTab,
    updateItemStatus
  }), [state]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}