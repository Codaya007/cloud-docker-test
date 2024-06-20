import axios from "axios";
const { API_BASEURL } = require("@/constants");

// export const getAllPronostics = async (token) => {
//   const url = `${API_BASEURL}/pronostics`;

//   const { data } = await axios.get(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return data;
// };

export const getPronosticsInRange = async (token, from, to, limit, page) => {
  const url =
    !from || !to
      ? `${API_BASEURL}/pronostics?limit=${limit}&page=${page}&populate=true`
      : `${API_BASEURL}/pronostics/${from}/${to}?limit=${limit}&page=${page}&populate=true`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getPronosticsStatics = async (token, date) => {
  const url = `${API_BASEURL}/pronostics/statics?${date ? `date=${date}` : ""}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getPronosticById = async (id, token) => {
  const url = `${API_BASEURL}/pronostics/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
