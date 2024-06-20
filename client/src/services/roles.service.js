import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const createRole = async (body, token) => {
  const url = `${API_BASEURL}/roles`;

  const { data } = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateRole = async (id, body, token) => {
  const url = `${API_BASEURL}/roles/${id}`;

  const { data } = await axios.patch(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteRole = async (id, token) => {
  const url = `${API_BASEURL}/roles/${id}`;

  const { data } = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getAllRoles = async (token, owner) => {
  const url = `${API_BASEURL}/roles`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getRoleById = async (id, token) => {
  const url = `${API_BASEURL}/roles/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
