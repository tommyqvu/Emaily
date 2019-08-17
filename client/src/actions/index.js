import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SURVEYS_FAIL,
  FETCH_SURVEYS_START,
  FETCH_SURVEYS_SUCCESS,
  SET_PAGE,
} from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');

    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const handleToken = token => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token);

    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const submitSurvey = (formValues, history) => async dispatch => {
  try {
    const res = await axios.post('/api/surveys', formValues);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

export const setPage = page => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: page,
  });
};

const fetchSurveysStart = () => ({
  type: FETCH_SURVEYS_START,
});

const fetchSurveysSuccess = surveys => ({
  type: FETCH_SURVEYS_SUCCESS,
  payload: surveys,
});

const fetchSurveysFail = error => ({
  type: FETCH_SURVEYS_FAIL,
  payload: error,
});

export const fetchSurveysAsync = page => async dispatch => {
  try {
    dispatch(fetchSurveysStart());
    const {data} = await axios.get(`/api/surveys?page=${page}`);
    dispatch(
      fetchSurveysSuccess({ surveys: data.surveys, count: data.count }),
    );
  } catch (e) {
    dispatch(fetchSurveysFail(e.message));
  }
};
