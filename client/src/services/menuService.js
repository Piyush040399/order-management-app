import api from "../api/axios";

export const getMenuItems = async () => {
  const response = await api.get("/menu");
  return response.data.data;
};