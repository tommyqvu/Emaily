import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import { submitSurvey } from '../../actions/index';
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please review your form</h5>
      {formFields.map(({ name, label }) => (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      ))}
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className='green btn-flat white-text right'
        onClick={() => {submitSurvey(formValues, history); }}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values,
});

const mapDispatchToProps = dispatch => ({
  submitSurvey: (formValues, history) => dispatch(submitSurvey(formValues, history)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SurveyReview));
