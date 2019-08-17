import React from 'react';

const SurveyCard = ({title, yes, no, body, dateSent}) => (
  <div className='card darken-1'>
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

export default SurveyCard