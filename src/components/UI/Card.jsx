import React from 'react';

const cardClassName = `rounded-3xl flex flex-col`;

const Card = ({ children, className }) => {
  return <div className={`${cardClassName} ${className}`}>{children}</div>;
};

export default Card;
