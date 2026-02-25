import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
  );
}

export default AppRoutes;