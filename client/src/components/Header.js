import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={this.props.auth ? '/surveys' : '/'} className='brand-logo'>
            Logo
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {this.props.auth ? (
              <li>
                <Link to={'/api/logout'}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to='/auth/google'>Login With Google</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
