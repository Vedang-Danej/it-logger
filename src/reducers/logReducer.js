import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
  UPDATE_LOG,
} from "../actions/types";

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};
const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.paylaod,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => action.payload !== log.id),
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default logReducer;
