import axiosInstance from "../api/axios";

export async function getVehicles() {
  const { data } = await axiosInstance.get("/vehicles");
  return Array.isArray(data) ? data : data.data || [];
}

export async function getVehicleById(id) {
  const { data } = await axiosInstance.get(`/vehicles/${id}`);
  return data;
}

export async function createVehicle(vehicleData) {
  const { data } = await axiosInstance.post("/vehicles", vehicleData);
  return data;
}

export async function updateVehicle(id, updates) {
  const { data } = await axiosInstance.put(`/vehicles/${id}`, updates);
  return data;
}

export async function deleteVehicle(id) {
  const { data } = await axiosInstance.delete(`/vehicles/${id}`);
  return data;
}

export async function purchaseVehicle(id) {
  const { data } = await axiosInstance.post(`/vehicles/${id}/purchase`);
  return data;
}

export async function restockVehicle(id, quantity) {
  const { data } = await axiosInstance.post(`/vehicles/${id}/restock`, { quantity });
  return data;
}
