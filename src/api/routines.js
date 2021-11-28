const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/routines";

import { setHeaders } from "./index";

export async function getAllRoutines() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    const routines = response.data;
    return routines;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function getRoutineById(id, token) {
  try {
    let headers = setHeaders(token);
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: headers,
    });
    const routine = response.data;
    return routine;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}
