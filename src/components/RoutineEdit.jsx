import { useState, useContext, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { updateRoutine, getRoutineById } from "../api";

import { UserContext } from "../App";

import RoutineActivities from "./RoutineActivities";

const RoutineEdit = () => {
  let navigate = useNavigate();
  const { routineId } = useParams();
  const { user, token } = useContext(UserContext);

  const [toEdit, setToEdit] = useState({});
  const [edited, setEdited] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [routine, setRoutine] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function thisRoutine() {
      try {
        const routine = await getRoutineById(routineId, token);
        setToEdit(routine);
        setIsPublic(routine.isPublic);
      } catch (err) {
        console.error(err);
      }
    }
    thisRoutine();
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user && token) {
        let updatedName, updatedGoal;
        if (name === toEdit.name) updatedName = undefined;
        const updated = await updateRoutine(
          token,
          routineId,
          updatedName,
          goal,
          isPublic
        );
        setRoutine(updated);
      } else {
        throw Error("Please log in to complete this action.");
      }
    } catch (err) {
      console.error(err);
      if (typeof err === "object") err = err.message;
      setError(err);
    }
  };

  return (
    <main className="text-center">
      <h1 className="text-4xl">Edit Routine</h1>
      {error ? (
        <div>
          <p>{error}</p>
          <button type="button" onClick={() => navigate(-1)}>
            GO BACK
          </button>
        </div>
      ) : !edited ? (
        <div>
          <form
            className="flex flex-col p-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit().then(setEdited(true));
            }}
          >
            <label className="font-medium">
              Name:
              <input
                type="text"
                className="ml-4 border-blue-100 border-2 p-2"
                defaultValue={toEdit ? toEdit.name : null}
                size="60"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label className="font-medium">
              Goal:
              <input
                type="text"
                className="ml-4 border-blue-100 border-2 p-2"
                defaultValue={toEdit ? toEdit.goal : null}
                size="60"
                onChange={(e) => setGoal(e.target.value)}
              ></input>
            </label>
            <label className="font-medium">
              Public?:
              <input
                type="checkbox"
                className="ml-2"
                defaultChecked={toEdit ? toEdit.isPublic : false}
                onClick={() => setIsPublic(!isPublic)}
              ></input>
            </label>
            <button type="submit" className="bg-blue-500 text-white">
              EDIT
            </button>
          </form>
          {Object.keys(toEdit).length > 0 ? (
            <RoutineActivities routine={toEdit} />
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col p-4 space-y-4">
          <p>
            <em>This routine has been edited.</em>
          </p>
          <p>
            Continue editing its activities below, or click the link to view
            your edited rouitne.
          </p>
          <p className="font-bold text-xl">{routine.name}</p>
          <p>{routine.goal}</p>
          <Link
            to={`/routines/${routine.id}`}
            className="text-blue-300 bg-blue-600"
          >
            VIEW
          </Link>
          {Object.keys(toEdit).length > 0 ? (
            <RoutineActivities routine={toEdit} />
          ) : null}
        </div>
      )}
    </main>
  );
};

export default RoutineEdit;
