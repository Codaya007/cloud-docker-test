import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const updateUser = async (id, body, token) => {
  const url = `${API_BASEURL}/accounts/${id}`;

  const { data } = await axios.put(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteUser = async (id, token) => {
  const url = `${API_BASEURL}/accounts/${id}`;

  const { data } = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getAllUsers = async (token) => {
  const url = `${API_BASEURL}/accounts`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getUserById = async (id, token) => {
  const url = `${API_BASEURL}/accounts/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
