import { Routes, Route } from "react-router-dom";
import Login from "./features/auths/Login";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./features/auths/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
