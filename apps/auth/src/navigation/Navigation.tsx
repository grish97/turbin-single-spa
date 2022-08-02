import { Navigate, Route, Routes } from "react-router-dom";

// Route types
import PublicNavigation from "./PublicNavigation";

import { Login, Register, Unauthorized } from "components/Auth";
import AuthLayout from "components/Layout/AuthLayout";

export default function Navigation() {
  return (
    <Routes>
      {/** Public routes */}
      <Route path="/auth" element={<PublicNavigation />}>
        <Route index element={<Navigate to="/auth/signin" replace />} />

        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}
