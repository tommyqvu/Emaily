import React from 'react';

const Paginator = ({ page, onDirection, lastPage }) => (
  <ul className='pagination center'>
    <li className={page > 1 ? 'waves-effect' : 'disabled'}>
      <a onClick={() => onDirection('previous')}>
        <i className='material-icons'>chevron_left</i>
      </a>
    </li>
    Showing page {page} of {lastPage}
    <li className={page < lastPage ? 'waves-effect' : 'disabled'}>
      <a onClick={() => onDirection('next')}>
        <i className='material-icons'>chevron_right</i>
      </a>
    </li>
  </ul>
);

export default Paginator;
