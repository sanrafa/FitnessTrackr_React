import { useState, useContext, useEffect, Fragment } from "react";

/* TODO:
  - *stretch goal* activityOptions should filter out existing routine_activities
*/

// API
import {
  addActivityToRoutine,
  deleteRoutineActivity,
  updateRoutineActivity,
  getRoutineById,
  getAllActivities,
} from "../api";

import { UserContext } from "../App";

import RoutineActivity from "./RoutineActivity";

const RoutineActivities = (props) => {
  const selectedRoutine = props.routine;
  const { user, token } = useContext(UserContext);

  const [activitiesChanged, setActivitiesChanged] = useState([]);
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
  }, [activitiesChanged]);

  const handleSubmit = async () => {
    try {
      const routineActivity = await addActivityToRoutine(
        token,
        selectedRoutine.id,
        activityToAdd,
        count,
        duration
      );
      setActivitiesChanged([...activitiesChanged, routineActivity]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deletedActivity = await deleteRoutineActivity(token, id);
      setActivitiesChanged(deletedActivity);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-semibold text-lg">
        Add or remove routine activities
      </h2>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit().then(() => {
            setCount("");
            setDuration("");
          });
        }}
      >
        <label className="font-medium">Select an activity:</label>
        <select
          className="w-3/5 self-center"
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
        <label className="mt-2 font-medium">
          Count (# of reps):
          <input
            type="number"
            min="0"
            max="100"
            value={count}
            className="ml-4 border-gray-500 border-2"
            onChange={(e) => setCount(e.target.value)}
          ></input>
        </label>
        <label className="mt-2 font-medium">
          Duration (in minutes):
          <input
            type="number"
            min="0"
            max="120"
            value={duration}
            className="ml-4 border-gray-500 border-2"
            onChange={(e) => setDuration(e.target.value)}
          ></input>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white w-28 self-center mt-4"
        >
          ADD
        </button>
      </form>
      {routineActivities // refactor into separate component?
        ? routineActivities.map((activity) => {
            return (
              <Fragment key={activity.id}>
                <RoutineActivity activity={activity} />
                <button
                  type="button"
                  className="bg-red-600 text-red-900 p-1"
                  onClick={() => handleDelete(activity.routineActivityId)}
                >
                  DELETE
                </button>
              </Fragment>
            );
          })
        : null}
    </div>
  );
};

export default RoutineActivities;
