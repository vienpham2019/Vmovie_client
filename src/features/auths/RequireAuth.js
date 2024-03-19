import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();
  const dispatch = useDispatch();
  const allowAccess = roles.some((role) => allowedRoles.includes(role));
  if (allowAccess) {
    return <Outlet />;
  } else {
    dispatch(
      setMessage({
        message: "Unauthorized access. Please log in to proceed.",
        messageType: notificationMessageEnum.WARNING,
      })
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
