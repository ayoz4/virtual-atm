import React from "react";
import classnames from "classnames";

import "./Input.scss";

function Input({ value, onChange, type = "text", placeholder }) {
  return (
    <label className="customInput">
      <input
        id="amount"
        className="customInput__input"
        className={classnames("customInput__input", { dirty: value.length })}
        type={type}
        placeholder="&nbsp;"
        value={value}
        onChange={onChange}
      />
      <span htmlFor="u" className="customInput__placeholder">
        {placeholder}
      </span>
    </label>
  );
}

export default Input;
