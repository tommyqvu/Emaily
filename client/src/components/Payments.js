import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions/index';
class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name='Emaily'
        description='5$ for 5 email credits'
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>ADD CREDITS</button>
      </StripeCheckout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleToken: token => dispatch(handleToken(token)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Payments);
