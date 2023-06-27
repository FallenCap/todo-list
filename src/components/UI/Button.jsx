import React from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex w-24 items-center justify-center inline-block px-5 py-3 overflow-hidden font-black  rounded-2xl group"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
      <span className="relative w-full text-center text-white text- transition-colors duration-200 ease-in-out group-hover:text-gray-900">
        {text}
      </span>
      <span className="absolute inset-0 border-2 border-white rounded-2xl"></span>
    </button>
  );
};

export default Button;
