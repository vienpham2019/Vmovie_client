import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useEffect, useState } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const { roles } = useAuth();
  const dispatch = useDispatch();
  const allowAccess = roles.some((role) => allowedRoles.includes(role));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [token, loading]);

  if (loading) {
    return null; // or a loading spinner or placeholder
  }

  if (allowAccess) {
    return <Outlet />;
  } else if (token) {
    dispatch(
      setMessage({
        message: "Unauthorized access. Please log in to proceed.",
        messageType: notificationMessageEnum.WARNING,
      })
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return null;
};

export default RequireAuth;
