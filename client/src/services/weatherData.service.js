import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const getWeatherData = async (token, from, to, limit, page) => {
  const url = `${API_BASEURL}/weatherdatas?since=${from}&until=${to}&limit=${limit}&page=${page}&populate=true`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getWeatherDataById = async (id, token) => {
  const url = `${API_BASEURL}/weatherdatas/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getWeatherDataStatics = async (token, date) => {
  const url = `${API_BASEURL}/weatherdatas/statics?${
    date ? `date=${date}` : ""
  }`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
