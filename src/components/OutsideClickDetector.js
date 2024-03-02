import { useEffect, useRef } from "react";

const OutsideClickDetector = ({ children, onOutsideClick }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClickDetector;
