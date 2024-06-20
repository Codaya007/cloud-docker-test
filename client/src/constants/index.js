export const IP_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])){3}$/;

export const PASSWORD_REGEX = /^(?=.*[\w\d])(?=.*[\W\S]).{8,}$/;

// export const API_BASEURL = process.env.BACKEND_URL;
export const API_BASEURL = "https://api-pis5to.fly.dev";
// export const API_BASEURL = "http://localhost:3001";

export const UUID_REGEX =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const BOOLEAN_DICTIONARY = {
  true: true,
  false: false,
};

export const IVA_PERCENTAJE = 0.12;

export const APP_INITIAL_DATE = "2022-01-01";
