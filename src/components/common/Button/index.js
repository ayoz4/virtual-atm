import React from "react";

import "./Button.scss";

function Button({ children, onClick }) {
  return (
    <button
      className="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log("asdasd");
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button;
