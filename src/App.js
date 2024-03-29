import { Routes, Route } from "react-router-dom";
import Login from "./features/auths/Login";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./features/auths/SignUp";
import MainLayout from "./layout/MainLayout";
import ForgotPassword from "./features/auths/ForgotPassword";
import ResetPassword from "./features/auths/ResetPassword";
import AdminLayout from "./layout/AdminLayout";
import Catalog from "./features/admin/Catalog";
import PersistLogin from "./features/auths/PersistLogin";
import { RoleEnum } from "./config/roles";
import RequireAuth from "./features/auths/RequireAuth";
import AddMovie from "./features/movie/AddMovie";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
        </Route>
        {/* Dash */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[RoleEnum.ADMIN]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="catalog">
                <Route path="" element={<Catalog />} />
                <Route path="addMovie" element={<AddMovie />} />
              </Route>
            </Route>
          </Route>
        </Route>{" "}
        {/*End Dash */}
      </Route>
    </Routes>
  );
};

export default App;
