import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded;

    return { username, roles };
  }
  return { username: "", roles: [] };
};

export default useAuth;
