import { useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRefreshTokenMutation } from "./authApiSlice";
import LoadingScreen from "../../components/LoadingScreen";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
const PersistLogin = () => {
  const [persist] = usePersist();
  const { token } = useSelector((state) => state.auth);
  const effectRan = useRef(false);
  const [refreshToken, { isLoading, isError }] = useRefreshTokenMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRan.current === true) {
      if (!token && persist) verifyRefreshToken();
    } else {
      effectRan.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    dispatch(
      setMessage({
        message:
          "Your login session has expired. Please log in again to continue.",
        messageType: notificationMessageEnum.ERROR,
      })
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PersistLogin;
