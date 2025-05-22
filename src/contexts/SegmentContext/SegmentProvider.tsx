import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { SegmentActionTypes, SegmentContextType, SegmentState } from './types';
import { segmentReducer } from './reducer';
import { Segment } from '../../types/segment';
import { deleteApi, getApi, postApi, putApi } from '../../utils/api/api';
import { WidgetProvider } from '../WidgetContext/WidgetProvider';

const initialState: SegmentState = {
  fetching: false,
  loading: false,
  segments: [],
};

const Context = createContext<SegmentContextType | undefined>(undefined);

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(segmentReducer, initialState);

  const addSegment = async (segment: Partial<Segment>) => {
    dispatch({ type: SegmentActionTypes.LOADING, payload: true });
    postApi<Segment>({ url: 'segments', payload: segment })
      .then((res) => {
        const { results } = res;
        const { data } = results ?? {};
        if (data) {
          dispatch({ type: SegmentActionTypes.ADD, payload: data });
        }
      })
      .finally(() =>
        dispatch({ type: SegmentActionTypes.LOADING, payload: false })
      );
  };

  const deleteSegment = async (id: number) => {
    dispatch({ type: SegmentActionTypes.LOADING, payload: true });
    deleteApi<Segment>({ url: `segments/${id}` })
      .then((res) => {
        const { results } = res;
        const { data } = results ?? {};
        if (data) {
          dispatch({ type: SegmentActionTypes.DELETE, payload: data.id });
        }
      })
      .finally(() =>
        dispatch({ type: SegmentActionTypes.LOADING, payload: false })
      );
  };

  const listSegments = async () => {
    dispatch({ type: SegmentActionTypes.FETCHING, payload: true });
    getApi<Segment[]>({ url: 'segments' })
      .then((res) => {
        const { results } = res;
        const { data } = results ?? {};
        if (data) {
          dispatch({ type: SegmentActionTypes.SET, payload: data });
        }
      })
      .finally(() =>
        dispatch({ type: SegmentActionTypes.FETCHING, payload: false })
      );
  };

  const updateSegment = async (segment: Partial<Segment>) => {
    dispatch({ type: SegmentActionTypes.LOADING, payload: true });
    const id = segment.id;
    delete segment.id;
    putApi<Segment>(`segments/${id}`, segment)
      .then((res) => {
        const { results } = res;
        const { data } = results ?? {};
        if (data) {
          dispatch({ type: SegmentActionTypes.UPDATE, payload: data });
        }
      })
      .finally(() =>
        dispatch({ type: SegmentActionTypes.LOADING, payload: false })
      );
  };

  const value = useMemo(
    () => ({ state, addSegment, deleteSegment, listSegments, updateSegment }),
    [state]
  );

  return (
    <Context.Provider value={value}>
      <WidgetProvider>{children}</WidgetProvider>
    </Context.Provider>
  );
}

export function useSegment() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return context;
}
