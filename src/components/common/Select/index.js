import React from "react";
import classnames from "classnames";

import "./Select.scss";
import { useOutsideDetecter } from "../../../services/hooks";

function Select({
  options = [],
  setSelected,
  selected,
  name = "name",
  value = "value",
  disabled = false,
}) {
  const { visible, setVisible, ref } = useOutsideDetecter(false);

  return (
    <div className="dropdown" ref={ref}>
      <div
        className={classnames("dropdown__select", {
          dropdown__select_disabled: disabled,
        })}
        onClick={() => setVisible(!visible)}
        tabIndex="1"
        style={{ borderColor: visible && "#006ee6" }}
      >
        {selected?.[name]}
      </div>

      {visible && (
        <div className="dropdown__list">
          {options.map((attr, index) => (
            <div
              className="dropdown__listItem"
              onClick={() => {
                if (!value) setSelected(attr);
                else setSelected(attr[value]);

                setVisible(false);
              }}
              key={index}
            >
              {attr[name]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
