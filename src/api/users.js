const axios = require("axios");

const usersInstance = axios.create({
  baseURL: "https://fitnesstrackr-rafa.herokuapp.com/api/users",
  // import headers from index later
});
