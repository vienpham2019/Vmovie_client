import { Routes, Route } from "react-router-dom";
import Login from "./features/auths/Login";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./features/auths/SignUp";
import MainLayout from "./components/MainLayout";
import ForgotPassword from "./features/auths/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
