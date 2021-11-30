import { useState, useEffect, useContext, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

//API
import { getRoutineById, deleteRoutine } from "../api";
import { UserContext } from "../App";

const RoutineSingleView = () => {
  let navigate = useNavigate();

  const { user, token } = useContext(UserContext);
  const { routineId } = useParams();

  const [routine, setRoutine] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function getRoutine() {
      try {
        const thisRoutine = await getRoutineById(routineId, token);
        setRoutine(thisRoutine);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }
    getRoutine();
  }, [user]);

  return (
    <main className="text-center">
      {error ? <p>{error}</p> : null}
      {routine && !error ? (
        <Fragment>
          {routine.creatorId == user.id ? (
            <Link to="edit" className="mr-4">
              EDIT
            </Link>
          ) : null}
          {routine.creatorId == user.id ? (
            <button
              type="button"
              className="text-red-700"
              onClick={() => {
                deleteRoutine(token, routineId).then(() => {
                  navigate("/profile");
                });
              }}
            >
              DELETE ROUTINE
            </button>
          ) : null}
          <h1 className="text-3xl">{routine.name}</h1>
          <Link to={`/users/${routine.creatorName}`} className="text-blue-400">
            {routine.creatorName}
          </Link>
          <p>{routine.goal}</p>
          {routine.activities ? (
            <div className="p-4">
              <h2 className="font-bold text-xl">Activities</h2>
              {routine.activities.map((activity) => (
                <div
                  key={activity.routineActivityId}
                  className="flex flex-col p-2"
                >
                  <Link
                    to={`/activities/${activity.id}`}
                    className="font-semibold"
                  >
                    {activity.name}
                  </Link>
                  <p>{activity.description}</p>
                  <span>Duration: {activity.duration} minutes</span>
                  <span>Count: {activity.count} reps</span>
                </div>
              ))}
            </div>
          ) : null}
          <Link to="/routines" className="text-blue-200">
            Back to all routines
          </Link>
        </Fragment>
      ) : null}
    </main>
  );
};

export default RoutineSingleView;
