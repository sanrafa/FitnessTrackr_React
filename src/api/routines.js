const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/routines";

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
