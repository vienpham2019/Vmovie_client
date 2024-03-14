import { useEffect, useRef } from "react";

const OutsideClickDetector = ({ children, onOutsideClick }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(ref.current.contains(event.target));
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div ref={ref} className="h-full">
      {children}
    </div>
  );
};

export default OutsideClickDetector;
