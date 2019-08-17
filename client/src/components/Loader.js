import React from 'react';

const Loader = () => (
  <div
    className='preloader-wrapper active center'
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
    }}
  >
    <div className='spinner-layer spinner-red-only'>
      <div className='circle-clipper left'>
        <div className='circle' />
      </div>
      <div className='gap-patch'>
        <div className='circle' />
      </div>
      <div className='circle-clipper right'>
        <div className='circle' />
      </div>
    </div>
  </div>
);

export default Loader;
