import React from "react";

import "./Button.scss";

function Button({ children, onClick, autofocus = false }) {
  return (
    <button
      className="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
      autoFocus={autofocus}
    >
      {children}
    </button>
  );
}

export default Button;
