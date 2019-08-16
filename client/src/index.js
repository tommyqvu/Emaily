import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers/index';

// Needs pagination, error handling, webhook in production

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    {' '}
    <App />
  </Provider>,
  document.querySelector('#root'),
);

/*
Testing sendgrid
import axios from 'axios';
window.axios = axios;
const survey = {
  title: 'my title',
  subject: 'my subject',
  recipients: 'tomvu1805@gmail.com',
  body: "Email's body"
};

axios.post("/api/surveys", survey)

*/
