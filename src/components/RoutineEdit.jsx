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
  }, []);

  const handleSubmit = async () => {
    try {
      if (user && token) {
        let updatedName, updatedGoal;
        if (name === toEdit.name) updatedName = undefined;
        if (goal === toEdit.goal) updatedGoal = undefined;
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
    <main>
      <h1>Edit Routine</h1>
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit().then(setEdited(true));
            }}
          >
            <label>
              Name:
              <input
                type="text"
                defaultValue={toEdit ? toEdit.name : null}
                size="60"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label>
              Goal:
              <input
                type="text"
                defaultValue={toEdit ? toEdit.goal : null}
                size="60"
                onChange={(e) => setGoal(e.target.value)}
              ></input>
            </label>
            <label>
              Public?:
              <input
                type="checkbox"
                defaultChecked={toEdit ? toEdit.isPublic : false}
                onChange={() => setIsPublic(!isPublic)}
              ></input>
            </label>
            <button type="submit">EDIT</button>
          </form>
          {Object.keys(toEdit).length > 0 ? (
            <RoutineActivities routine={toEdit} />
          ) : null}
        </div>
      ) : (
        <div>
          <p>
            <em>This routine has been edited.</em> Continue editing its
            activities below, or click the link to view your edited rouitne.
          </p>
          <p>{routine.name}</p>
          <p>{routine.goal}</p>
          <Link to={`/routines/${routine.id}`}>VIEW</Link>
        </div>
      )}
    </main>
  );
};

export default RoutineEdit;
