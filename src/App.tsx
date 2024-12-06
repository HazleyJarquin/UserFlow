import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { useAuthToken } from "./store/useAuthTokenStore";
import { PrivateRoute } from "./components/PrivateRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import { Users } from "./pages/Users";

function App() {
  const { token } = useAuthToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
