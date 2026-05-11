import React from 'react';

const Button = (props) => {
  return (
    <button className="premium-btn px-5 text-sm md:ml-4">
      {props.children}
    </button>
  );
};

export default Button;
