import { BASE_AUTH_URL } from './constants';

function checkResponseStatus(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

export function register(userData) {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(checkResponseStatus);
}

export function authorize(userData) {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(checkResponseStatus);
}

export function getLoggedUser() {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponseStatus);
}

export function logout() {
  return fetch(`${BASE_AUTH_URL}/logout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponseStatus);
}
