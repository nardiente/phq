import { Segment } from '../../types/segment';

export interface SegmentState {
  fetching: boolean;
  loading: boolean;
  segments: Segment[];
}

export enum SegmentActionTypes {
  ADD = 'ADD',
  DELETE = 'DELETE',
  FETCHING = 'FETCHING',
  LOADING = 'LOADING',
  SET = 'SET',
  UPDATE = 'UPDATE',
}

export interface SegmentContextType {
  state: SegmentState;
  addSegment: (segment: Partial<Segment>) => Promise<void>;
  deleteSegment: (id: number) => Promise<void>;
  listSegments: () => Promise<void>;
  updateSegment: (segment: Partial<Segment>) => Promise<void>;
}

export type SegmentAction =
  | { type: SegmentActionTypes.ADD; payload: Segment }
  | { type: SegmentActionTypes.DELETE; payload: number }
  | { type: SegmentActionTypes.FETCHING; payload: boolean }
  | { type: SegmentActionTypes.LOADING; payload: boolean }
  | { type: SegmentActionTypes.SET; payload: Segment[] }
  | { type: SegmentActionTypes.UPDATE; payload: Segment };
