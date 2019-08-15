import React from 'react';
import {reduxForm} from "redux-form"
import SurveryForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveryNew extends React.Component {
  state = { showReview: false };
  render() {
    return (
      <div>
        {this.state.showReview ? (
          <SurveyReview onCancel={()=>this.setState({ showReview: false })} />
        ) : (
          <SurveryForm
            onSurveySubmit={() => this.setState({ showReview: true })}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({form: "surveyForm"})(SurveryNew);
