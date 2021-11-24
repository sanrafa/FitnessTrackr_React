const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/activities";

export async function getAllActivities() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    const activities = response.data;
    return activities;
  } catch (err) {
    console.err(err);
  }
}
