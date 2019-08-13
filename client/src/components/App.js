import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/index';

import Header from './Header';
import Landing from "./Landing"
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route path='/' component={Landing} exact />
            <Route path='/surveys' component={Dashboard} exact />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { fetchUser: () => dispatch(fetchUser()) };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
