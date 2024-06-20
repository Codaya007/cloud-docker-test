export const save = (key, data) => {
  window.sessionStorage.setItem(key, data);
};

export const get = (key) => {
  window.sessionStorage.getItem(key);
};

export const saveToken = (value) => {
  return window.sessionStorage.setItem("token", value);
};

export const getToken = () => {
  const c = window.sessionStorage.getItem("token");
  return c;
};

export const borrarSesion = () => {
  window.sessionStorage.clear();
};

export const estaSesion = () => {
  if (typeof window != undefined) {
    var token = window.sessionStorage.getItem("token");
    return token && (token != "undefined" || token != null || token != "null");
  }
};
