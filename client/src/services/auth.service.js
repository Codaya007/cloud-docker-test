import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const login = async (body) => {
  const url = `${API_BASEURL}/auth/login`;

  const { data: loginResponse } = await axios.post(url, body);

  return loginResponse;
};

export const forgotPassword = async (body) => {
  const url = `${API_BASEURL}/auth/forgot-password`;

  const { data } = await axios.post(url, body);

  return data;
};

export const recoveryPassword = async (token, body) => {
  const url = `${API_BASEURL}/auth/recovery-password/${token}`;

  const { data } = await axios.post(url, body);

  return data;
};

export const registerUser = async (body, token) => {
  const url = `${API_BASEURL}/accounts`;

  const { data: registerResponse } = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return registerResponse;
};
