import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  render() {
    const {surveys} = this.props
    return (
      <div>
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
  surveys,
});

const mapDispatchToProps = dispatch => ({
  fetchSurveys: () => dispatch(fetchSurveys()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyList);
