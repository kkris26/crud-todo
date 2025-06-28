import React from "react";

const ButtonIcon = ({ children, action }) => {
  return (
    <button onClick={action} className="btn btn-xs btn-square btn-ghost border border-base-200 bg-base-200 shadow">
      {children}
    </button>
  );
};

export default ButtonIcon;
