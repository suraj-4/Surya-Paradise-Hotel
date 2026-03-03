import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layout/DashboardLayout";
import PageNotFound from "@/pages/PageNotFound";
import Rooms from "@/pages/Rooms";
import Bookings from "@/pages/Bookings";
import Hotels from "@/pages/Hotels";
import Staff from "@/pages/Staff";

function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default PrivateRoutes;