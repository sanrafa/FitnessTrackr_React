const axios = require("axios");

const activitiesInstance = axios.create({
  baseURL: "https://fitnesstrackr-rafa.herokuapp.com/api/activities",
  // import headers from index later
});
