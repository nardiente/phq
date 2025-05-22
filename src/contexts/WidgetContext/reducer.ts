import { WidgetAction, WidgetActionTypes, WidgetState } from './type';

export function widgetReducer(
  state: WidgetState,
  action: WidgetAction
): WidgetState {
  switch (action.type) {
    case WidgetActionTypes.ADD:
      return { ...state, widgets: [...state.widgets, action.payload] };
    case WidgetActionTypes.DELETE:
      return {
        ...state,
        widgets: state.widgets.filter((prev) => prev.id !== action.payload),
      };
    case WidgetActionTypes.FETCHING:
      return { ...state, fetching: action.payload };
    case WidgetActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case WidgetActionTypes.SET:
      return { ...state, widgets: action.payload };
    case WidgetActionTypes.SET_EDITING_WIDGET_ID:
      return { ...state, editingWidgetId: action.payload };
    case WidgetActionTypes.SET_WIDGET:
      return { ...state, widget: action.payload };
    case WidgetActionTypes.SET_WIDGET_CONFIG:
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case WidgetActionTypes.UPDATE:
      return {
        ...state,
        widgets: state.widgets.map((prev) =>
          prev.id === action.payload.id ? action.payload : prev
        ),
      };
    default:
      return state;
  }
}
