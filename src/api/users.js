const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/users";

import { setHeaders } from ".";

export async function registerUser({ username, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username: username,
      password: password,
    });
    const data = response.data;
    console.log(data);
    console.log(response);
    return data;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function loginUser({ username, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username: username,
      password: password,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function getUser(token) {
  try {
    let headers = setHeaders(token);
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: headers,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function getRoutinesByUser(token = null, username) {
  try {
    let headers = setHeaders(token);
    const response = await axios.get(`${BASE_URL}/${username}/routines`, {
      headers: headers,
    });
    const routines = response.data;
    return routines;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}
