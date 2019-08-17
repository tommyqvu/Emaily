import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='/auth/google'>Login With Google</a>
          </li>
        );
      default:
        return (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0px 10px' }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a href={'/api/logout'}>Logout</a>
            </li>
          </Fragment>
        );
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={auth ? '/surveys' : '/'} className='brand-logo' style={{marginLeft: "10px"}}>
            Emaily
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
