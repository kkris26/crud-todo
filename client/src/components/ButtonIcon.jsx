import React from "react";

const ButtonIcon = ({ children, action }) => {
  return (
    <button
      onClick={action}
      className="  relative group btn btn-xs btn-square btn-ghost border border-base-200 bg-base-300 "
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
