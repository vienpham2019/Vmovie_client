import { useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRefreshTokenMutation } from "./authApiSlice";
const PersistLogin = () => {
  const [persist] = usePersist();
  const { token } = useSelector((state) => state.auth);
  const effectRan = useRef(false);
  const [refreshToken, { isLoading, isError }] = useRefreshTokenMutation();
  const location = useLocation();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error);
      }
    };

    if (effectRan.current === true) {
      if (!token && persist) verifyRefreshToken();
    } else {
      effectRan.current = true;
    }
  }, [token, persist, refreshToken]);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PersistLogin;
