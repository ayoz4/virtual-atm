import { useState, useRef, useEffect } from "react";

export const useOutsideDetecter = (init) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(init);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    visible,
    setVisible,
    ref,
  };
};
