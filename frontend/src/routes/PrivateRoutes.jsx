import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default PrivateRoutes;