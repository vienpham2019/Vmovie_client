import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  let status;

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    return { username, status, roles };
  }
  return { username: "", roles: [], status };
};

export default useAuth;
