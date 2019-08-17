import React from 'react';
import { connect } from 'react-redux';

import Paginator from '../Paginator';
import Loader from '../Loader';
import { fetchSurveysAsync, setPage } from '../../actions/index';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  loadPosts = direction => {
    let { fetchSurveys, page, setPage, totalSurveys } = this.props;
    if (direction === 'next' && page < Math.ceil(totalSurveys / 5)) {
      page++;
      setPage(page);
      fetchSurveys(page);
    }
    if (direction === 'previous' && page > 1) {
      page--;
      setPage(page);
      fetchSurveys(page);
    }
  };

  render() {
    const { surveys, loading, error, page, totalSurveys } = this.props;
    return (
      <div>
        <Paginator
          page={page}
          lastPage={Math.ceil(totalSurveys / 5)}
          onDirection={direction => this.loadPosts(direction)}
        />
        {loading && <Loader />}
        {error && <div className='red-text center'>{error}</div>}
        {surveys.reverse().map(({ _id, title, yes, no, body, dateSent }) => {
          return (
            <div key={_id} className='card darken-1'>
              <div className='card-content'>
                <span className='card-title'>{title}</span>
                <p>{body}</p>
                <p className='right'>
                  Sent on: {new Date(dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className='card-action'>
                <a>Yays: {yes}</a>
                <a>Neighs: {no}</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys: surveys.surveys,
  loading: surveys.loading,
  error: surveys.error,
  page: surveys.page,
  totalSurveys: surveys.totalSurveys,
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setPage(page)),
  fetchSurveys: (page = 1) => dispatch(fetchSurveysAsync(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyList);
