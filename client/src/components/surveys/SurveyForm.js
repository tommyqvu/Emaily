import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

import emailValidator from '../../utils/validateEmails';

import formFields from "./formFields"

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        {formFields.map(({ label, name }) => (
          <Field
            key={name}
            type='text'
            component={SurveyField}
            label={label}
            name={name}
          />
        ))}
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = emailValidator(values.recipients || '');

  formFields.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
