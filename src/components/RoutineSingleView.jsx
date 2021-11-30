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
    <main>
      {error ? <p>{error}</p> : null}
      {routine && !error ? (
        <Fragment>
          {routine.creatorId == user.id ? <Link to="edit">EDIT</Link> : null}
          {routine.creatorId == user.id ? (
            <button
              type="button"
              onClick={() => {
                deleteRoutine(token, routineId).then(() => {
                  navigate("/profile");
                });
              }}
            >
              DELETE ROUTINE
            </button>
          ) : null}
          <h1>{routine.name}</h1>
          <Link to={`/users/${routine.creatorName}`}>
            {routine.creatorName}
          </Link>
          <p>{routine.goal}</p>
          {routine.activities ? (
            <div>
              <h2>Activities</h2>
              {routine.activities.map((activity) => (
                <div key={activity.routineActivityId}>
                  <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
                  <p>{activity.description}</p>
                  <span>Duration: {activity.duration} minutes</span>
                  <span>Count: {activity.count} reps</span>
                </div>
              ))}
            </div>
          ) : null}
        </Fragment>
      ) : null}
    </main>
  );
};

export default RoutineSingleView;
