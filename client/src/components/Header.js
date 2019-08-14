import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
const Header = ({ auth }) => (
  <nav>
    <div className='nav-wrapper'>
      <Link to={auth ? '/surveys' : '/'} className='brand-logo'>
        Logo
      </Link>
      <ul id='nav-mobile' className='right hide-on-med-and-down'>
        {auth ? (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0px 10px' }}>Credits: {auth.credits}</li>
            <li>
              <Link to={'/api/logout'}>Logout</Link>
            </li>
          </Fragment>
        ) : (
          <li>
            <Link to='/auth/google'>Login With Google</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
