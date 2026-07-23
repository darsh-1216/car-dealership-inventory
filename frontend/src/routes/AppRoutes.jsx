import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import AddVehicle from "../pages/vehicles/AddVehicle";
import EditVehicle from "../pages/vehicles/EditVehicle";
import Vehicles from "../pages/vehicles/Vehicles";
import NotFound from "../pages/errors/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicles/add" element={<AddVehicle />} />
      <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
