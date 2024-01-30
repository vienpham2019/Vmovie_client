import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const MainLayout = () => {
  const [displayMessage, setDisplayMessage] = useState(true);
  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       setDisplayMessage(false);
  //     }, 3000);
  //     return () => clearTimeout(timeoutId);
  //   }, []);

  return (
    <div className="relative overflow-x-hidden">
      {displayMessage && <ErrorMessage message="success" />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
