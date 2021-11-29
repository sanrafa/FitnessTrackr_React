import { useState, useContext, useEffect } from "react";

/* TODO:
  - activitiesAdded should populate with existing routine_activities (if any) on render
  - *stretch goal* activityOptions should filter out existing routine_activities
  - when "REMOVE" button clicked, routine_activity should be deleted from database 
    AND from activitiesAdded, triggering re-render
  - generalize component to be used with Edit Routine component
*/

// API
import {
  addActivityToRoutine,
  deleteRoutineActivity,
  getRoutineById,
  getAllActivities,
} from "../api";

import { UserContext } from "../App";

const RoutineNewActivities = (props) => {
  const selectedRoutine = props.routine;
  const { user, token } = useContext(UserContext);

  const [activitiesAdded, setActivitiesAdded] = useState([]);
  const [activityOptions, setActivityOptions] = useState([]);
  const [routineActivities, setRoutineActivities] = useState([]);
  const [activityToAdd, setActivityToAdd] = useState(0); // activity ID
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    async function fetchActivities() {
      try {
        let activities = await getAllActivities();
        setActivityOptions(activities);
      } catch (err) {
        console.error(err);
      }
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    async function updateRoutineActivities() {
      try {
        const routineId = selectedRoutine.id;
        const routine = await getRoutineById(routineId, token);
        if (routine.activities) {
          setRoutineActivities(routine.activities);
        }
      } catch (err) {
        console.error(err);
      }
    }

    updateRoutineActivities();
  }, [activitiesAdded]);

  const handleSubmit = async () => {
    try {
      const routineActivity = await addActivityToRoutine(
        token,
        selectedRoutine.id,
        activityToAdd,
        count,
        duration
      );
      setActivitiesAdded([...activitiesAdded, routineActivity]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add an activity</h2>
      {routineActivities
        ? routineActivities.map((activity) => (
            <div>
              <p>
                <strong>{activity.name}</strong>
              </p>
              <button type="button">REMOVE</button>
            </div>
          ))
        : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit().then(() => {
            setCount("");
            setDuration("");
          });
        }}
      >
        <label>Select an activity:</label>
        <select
          name="activity"
          id="activity"
          value={activityToAdd}
          onChange={(e) => {
            setActivityToAdd(e.target.value);
          }}
        >
          {activityOptions.map((ele) => (
            <option key={ele.id} value={ele.id}>
              {ele.name}
            </option>
          ))}
        </select>
        <label>
          Count (# of reps):
          <input
            type="number"
            min="0"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          ></input>
        </label>
        <label>
          Duration (in minutes):
          <input
            type="number"
            min="0"
            max="120"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>
        </label>

        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default RoutineNewActivities;
