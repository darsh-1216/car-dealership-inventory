import axiosInstance from "../api/axios";

export async function getVehicles() {
  const { data } = await axiosInstance.get("/vehicles");

  return Array.isArray(data) ? data : data.data || [];
}
