import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// API
import { createRoutine } from "../api";

import { UserContext } from "../App";

import RoutineActivities from "./RoutineActivities"; // use to add activities to routine

const RoutineNew = () => {
  const { user, token } = useContext(UserContext);

  const [newRoutine, setNewRoutine] = useState({});
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const createNewRoutine = async () => {
    try {
      if (user && token) {
        console.log("Creating routine!");
        const routine = await createRoutine(token, name, goal, isPublic);
        if (routine === "") {
          throw Error("That routine name is taken - please choose another.");
        } else {
          setNewRoutine(routine);
          setError(null);
        }
      }
    } catch (err) {
      if (typeof err === "object") err = err.message;
      setError(err);
    }
  };

  return (
    <main>
      <h1>Create a new routine</h1>
      {error ? <p>{error}</p> : null}
      {Object.keys(newRoutine).length === 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewRoutine();
          }}
        >
          <label>
            Name:
            <input
              type="text"
              size="60"
              required={true}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <label>
            Goal:
            <input
              type="text"
              size="60"
              required={true}
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
            ></input>
          </label>
          <label>
            Make this routine public?
            <input
              type="checkbox"
              onChange={() => setIsPublic(!isPublic)}
            ></input>
          </label>
          <button type="submit">ADD ACTIVITIES</button>
        </form>
      ) : (
        <div>
          <h2>{newRoutine.name}</h2>
          <p>{newRoutine.goal}</p>
          <Link to={`/routines/${newRoutine.id}`}>VIEW</Link>
          <p>Or continue adding activities below!</p>
        </div>
      )}

      {Object.keys(newRoutine).length > 0 ? (
        <RoutineActivities routine={newRoutine} />
      ) : null}
    </main>
  );
};

export default RoutineNew;
