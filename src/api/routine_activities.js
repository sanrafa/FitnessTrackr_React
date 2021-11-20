const axios = require("axios");

const routineActivitiesInstance = axios.create({
  baseURL: "https://fitnesstrackr-rafa.herokuapp.com/api/routine_activities",
  // import headers from index later
});
