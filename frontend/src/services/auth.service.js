import axiosInstance from "../api/axios";

export async function loginUser(email, password) {
  const { data } = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return data;
}

export async function registerUser(email, password, role = "customer") {
  const { data } = await axiosInstance.post("/auth/register", {
    email,
    password,
    role,
  });

  return data;
}
