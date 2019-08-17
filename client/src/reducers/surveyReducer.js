import {
  FETCH_SURVEYS_FAIL,
  FETCH_SURVEYS_START,
  FETCH_SURVEYS_SUCCESS,
  SET_PAGE,
} from '../actions/types';

const defaultState = {
  surveys: [],
  error: null,
  loading: false,
  page: 1,
  totalSurveys: 0,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload };
    case FETCH_SURVEYS_START:
      return { ...state, loading: true, surveys: [] };
    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        surveys: action.payload.surveys,
        totalSurveys: action.payload.count,
      };
    case FETCH_SURVEYS_FAIL:
      return { ...state, loading: false, error: action.payload, surveys: [] };
    default:
      return state;
  }
}
