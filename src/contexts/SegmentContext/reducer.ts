import { SegmentAction, SegmentActionTypes, SegmentState } from './types';

export function segmentReducer(
  state: SegmentState,
  action: SegmentAction
): SegmentState {
  switch (action.type) {
    case SegmentActionTypes.ADD:
      return { ...state, segments: [...state.segments, action.payload] };
    case SegmentActionTypes.DELETE:
      return {
        ...state,
        segments: state.segments.filter((prev) => prev.id !== action.payload),
      };
    case SegmentActionTypes.FETCHING:
      return { ...state, fetching: action.payload };
    case SegmentActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case SegmentActionTypes.SET:
      return { ...state, segments: action.payload };
    case SegmentActionTypes.UPDATE:
      return {
        ...state,
        segments: state.segments.map((prev) =>
          prev.id === action.payload.id ? action.payload : prev
        ),
      };
    default:
      return state;
  }
}
