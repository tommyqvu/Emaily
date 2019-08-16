import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

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

export const fetchSurveys = () => async dispatch => {
  try {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data.surveys });
  } catch (e) {
    console.log(e);
  }
};
