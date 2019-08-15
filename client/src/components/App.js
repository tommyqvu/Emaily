import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/index';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route path='/' component={Landing} exact />
          <Route path='/surveys' component={Dashboard} exact />
          <Route path='/surveys/new' component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
