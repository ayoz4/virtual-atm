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

export const useKey = (key, cb) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(e) {
      if (e.code === key) {
        console.log(cb());
      }
    }

    document.addEventListener("keypress", handle);

    return () => document.removeEventListener("keypress", handle);
  }, [key]);
};
