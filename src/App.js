import { Routes, Route } from "react-router-dom";
import Login from "./features/auths/Login";
import AuthLayout from "./components/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
