const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/users";

async function registerUser({ username, password }) {
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
    const message = err.response.data;
    console.log("Error is:", message);
    return message;
  }
}

registerUser({ username: "test", password: "test1234" });
