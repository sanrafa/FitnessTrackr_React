import { useEffect, useState, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API
import { getRoutinesByActivity } from "../api";

const ActivityRoutines = () => {
  let navigate = useNavigate();

  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");

  const { activityId } = useParams();

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const allRoutines = await getRoutinesByActivity(activityId);
        setRoutines(allRoutines);
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    fetchRoutines();
  }, []);

  return (
    <section>
      <h3>Featured in:</h3>
      {!error ? (
        <Fragment>
          {routines ? (
            <div>
              {routines.map((routine) => (
                <div key={routine.id}>
                  <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
                  <p>{routine.goal}</p>
                  <Link to={`/users/${routine.creatorName}`}>
                    {routine.creatorName}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            "No associated routines"
          )}
        </Fragment>
      ) : (
        <p>{error}</p>
      )}

      <Link to={`/activities/${activityId}`}>CLOSE</Link>
    </section>
  );
};

export default ActivityRoutines;
