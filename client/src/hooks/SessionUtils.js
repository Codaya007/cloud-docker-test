'use client';

export const saveItem = (key, data) => {
    return sessionStorage.setItem(key, data);
}

export function getItem(key) {
    return sessionStorage.getItem(key);
}

export const saveToken = (data) => {
    return sessionStorage.setItem("token", data)
}
export function getToken() {
    return sessionStorage.getItem("token");
}

export const clearSession = () => {
    sessionStorage.clear();
}

export const isSession = () => {
    var token = sessionStorage.getItem('token');
    return (token && (token != 'undefined' || token != null || token != 'null'));
}