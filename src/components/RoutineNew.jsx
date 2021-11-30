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
    <main className="text-center">
      <h1 className="text-4xl">Create a new routine</h1>
      {error ? <p>{error}</p> : null}
      {Object.keys(newRoutine).length === 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewRoutine();
          }}
          className="flex flex-col p-4 space-y-4"
        >
          <label className="font-medium">
            Name:
            <input
              type="text"
              className="ml-4 border-blue-100 border-2 p-2"
              size="60"
              required={true}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <label className="font-medium">
            Goal:
            <input
              type="text"
              className="ml-4 border-blue-100 border-2 p-2"
              size="60"
              required={true}
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
            ></input>
          </label>
          <label className="font-medium">
            Make this routine public?
            <input
              type="checkbox"
              className="ml-2"
              onChange={() => setIsPublic(!isPublic)}
            ></input>
          </label>
          <button type="submit" className="bg-blue-500 text-white">
            ADD ACTIVITIES
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <h2 className="font-bold text-xl">{newRoutine.name}</h2>
          <p className="p-2">{newRoutine.goal}</p>
          <Link
            to={`/routines/${newRoutine.id}`}
            className="text-blue-300 bg-blue-600 p-1"
          >
            VIEW
          </Link>
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
