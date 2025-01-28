import React from "react";

const CustomButton = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`button-85 relative px-4 py-2 text-lg font-bold text-white bg-red-800 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-transform ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
