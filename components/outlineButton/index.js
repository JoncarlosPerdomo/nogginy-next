import React from 'react';

const OutlineButton = ({ label, ...props }) => {
  return (
    <button
      type="button"
      className=" hover:ring-white-400 m-4 rounded-lg px-4 py-2 text-xl text-white ring-4 ring-white hover:bg-white hover:text-sky-400 hover:ring-4 "
      {...props}
    >
      {label}
    </button>
  );
};

export default OutlineButton;
