const axios = require("axios").default;
const BASE_URL =
  "https://fitnesstrackr-rafa.herokuapp.com/api/routine_activities";

import { setHeaders } from ".";

export async function updateRoutineActivity(
  token,
  routineActivityId,
  count,
  duration
) {
  try {
    let headers = setHeaders(token);
    const response = await axios.patch(
      `${BASE_URL}/${routineActivityId}`,
      {
        count: count,
        duration: duration,
      },
      {
        headers: headers,
      }
    );
    const routineActivity = response.data;
    return routineActivity;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function deleteRoutineActivity(token, routineActivityId) {
  try {
    let headers = setHeaders(token);
    const response = await axios.delete(`${BASE_URL}/${routineActivityId}`, {
      headers: headers,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}
