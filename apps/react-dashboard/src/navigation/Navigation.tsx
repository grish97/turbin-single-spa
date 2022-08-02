import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateNavigation } from "./PrivateNavigation";
import { PersistLogin } from "./PersistLogin";

// Pages
import { Dashboard } from "pages/Dashboard";

export const Navigation = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<PrivateNavigation />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};