const axios = require("axios").default;
const BASE_URL = "https://fitnesstrackr-rafa.herokuapp.com/api/routines";

import { setHeaders } from "./index";

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

export async function getRoutineById(id, token) {
  try {
    let headers = setHeaders(token);
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: headers,
    });
    const routine = response.data;
    return routine;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function createRoutine(token, name, goal, isPublic = false) {
  try {
    let headers = setHeaders(token);
    const response = await axios.post(
      `${BASE_URL}`,
      {
        name: name,
        goal: goal,
        isPublic: isPublic,
      },
      {
        headers: headers,
      }
    );
    console.log(response);
    const newRoutine = response.data;
    return newRoutine;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}

export async function addActivityToRoutine(
  token,
  routineId,
  activityId,
  count,
  duration
) {
  try {
    let headers = setHeaders(token);
    const response = await axios.post(
      `${BASE_URL}/${routineId}/activities`,
      {
        activityId: activityId,
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

export async function deleteRoutine(token, routineId) {
  try {
    let headers = setHeaders(token);
    const response = await axios.delete(`${BASE_URL}/${routineId}`, {
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

export async function updateRoutine(token, routineId, name, goal, isPublic) {
  try {
    let headers = setHeaders(token);
    const response = await axios.patch(
      `${BASE_URL}/${routineId}`,
      {
        name: name,
        goal: goal,
        isPublic: isPublic,
      },
      {
        headers: headers,
      }
    );
    const updatedRoutine = response.data;
    return updatedRoutine;
  } catch (err) {
    console.error(err);
    const error = err.response.data;
    throw error.message;
  }
}
