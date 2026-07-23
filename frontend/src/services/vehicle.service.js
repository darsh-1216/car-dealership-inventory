import axiosInstance from "../api/axios";

export async function getVehicles() {
  const { data } = await axiosInstance.get("/vehicles");

  return Array.isArray(data) ? data : data.data || [];
}

export async function getVehicleById(id) {
  const { data } = await axiosInstance.get(`/vehicles/${id}`);
  return data;
}

export async function purchaseVehicle(id) {
  const { data } = await axiosInstance.post(`/vehicles/${id}/purchase`);
  return data;
}

