import React from "react";

import "./Numpad.scss";

function Numpad({ value, setValue }) {
  return (
    <div className="numpad">
      <ul className="numpad__list">
        <li
          className="numpad__item"
          value="9"
          onClick={(e) => setValue(value + e.target.value)}
        >
          9
        </li>
        <li
          className="numpad__item"
          value="8"
          onClick={(e) => setValue(value + e.target.value)}
        >
          8
        </li>
        <li
          className="numpad__item"
          value="7"
          onClick={(e) => setValue(value + e.target.value)}
        >
          7
        </li>
        <li
          className="numpad__item"
          value="6"
          onClick={(e) => setValue(value + e.target.value)}
        >
          6
        </li>
        <li
          className="numpad__item"
          value="5"
          onClick={(e) => setValue(value + e.target.value)}
        >
          5
        </li>
        <li
          className="numpad__item"
          value="4"
          onClick={(e) => setValue(value + e.target.value)}
        >
          4
        </li>
        <li
          className="numpad__item"
          value="3"
          onClick={(e) => setValue(value + e.target.value)}
        >
          3
        </li>
        <li
          className="numpad__item"
          value="2"
          onClick={(e) => setValue(value + e.target.value)}
        >
          2
        </li>
        <li
          className="numpad__item"
          value="1"
          onClick={(e) => setValue(value + e.target.value)}
        >
          1
        </li>
        <li
          className="numpad__item"
          value="0"
          onClick={(e) => setValue(value + e.target.value)}
        >
          0
        </li>
        <li
          className="numpad__item"
          onClick={() => {
            setValue(value.slice(0, -1));
          }}
        >
          &gt;
        </li>
        <li className="numpad__item" onClick={() => setValue("")}>
          C
        </li>
      </ul>
    </div>
  );
}

export default Numpad;
