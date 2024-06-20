import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const createSensor = async (body, token) => {
  const url = `${API_BASEURL}/sensors`;

  const { data } = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateSensor = async (id, body, token) => {
  const url = `${API_BASEURL}/sensors/${id}`;

  const { data } = await axios.put(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteSensor = async (id, token) => {
  const url = `${API_BASEURL}/sensors/${id}`;

  const { data } = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getAllSensors = async (token, owner) => {
  const url = `${API_BASEURL}/sensors`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getSensorById = async (id, token) => {
  const url = `${API_BASEURL}/sensors/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
