const axios = require("axios");

const routinesInstance = axios.create({
  baseURL: "https://fitnesstrackr-rafa.herokuapp.com/api/routines",
  // import headers from index later
});
