const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/activities";

async function getAllActivities() {
  const response = await axios.get(`${BASE_URL}`);
  const activities = response.data;
  return activities;
}
