const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/activities";

import { setHeaders } from ".";

export async function getAllActivities() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    const activities = response.data;
    return activities;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function getActivityById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    const activity = response.data;
    return activity;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function createActivity(token, name, description) {
  try {
    let headers = setHeaders(token);
    const response = await axios.post(
      `${BASE_URL}`,
      {
        name: name,
        description: description,
      },
      {
        headers: headers,
      }
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}
