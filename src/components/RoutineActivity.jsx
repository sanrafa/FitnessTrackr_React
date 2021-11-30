import { useState, useContext, Fragment } from "react";

import { updateRoutineActivity } from "../api";

import { UserContext } from "../App";

const RoutineActivity = (props) => {
  const { token } = useContext(UserContext);
  const { activity } = props;

  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      let updatedCount, updatedDuration;
      !count ? (updatedCount = activity.count) : (updatedCount = count);
      !duration
        ? (updatedDuration = activity.duration)
        : (updatedDuration = duration);
      await updateRoutineActivity(
        token,
        activity.routineActivityId,
        updatedCount,
        updatedDuration
      );
      setUpdated(true);
      setError(null);
      setTimeout(() => {
        setUpdated(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setUpdated(false);
      setError(true);
    }
  };

  return (
    <Fragment>
      <p className="italic">{activity.name}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-x-4"
      >
        <label>
          Count:
          <input
            type="number"
            min="0"
            max="100"
            className="ml-4 border-gray-500 border-2 p-0.5"
            defaultValue={activity.count}
            onChange={(e) => setCount(e.target.value)}
          ></input>
        </label>
        <label>
          Duration:
          <input
            type="number"
            min="0"
            max="120"
            className="ml-4 border-gray-500 border-2 p-0.5"
            defaultValue={activity.duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>
        </label>
        <button type="submit" className="bg-green-500 text-white p-0.5">
          EDIT
        </button>{" "}
        {/* DELETE is handled by parent component */}
      </form>
      {updated ? <span>Saved.</span> : null}
      {error ? <span>Error updating activity.</span> : null}
    </Fragment>
  );
};

export default RoutineActivity;
