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
    <section className="text-center p-2">
      <h3 className="font-semibold">Featured in:</h3>
      {!error ? (
        <Fragment>
          {routines ? (
            <div className="p-4">
              {routines.map((routine) => (
                <div key={routine.id}>
                  <Link to={`/routines/${routine.id}`} className="font-bold">
                    {routine.name}
                  </Link>
                  <p>{routine.goal}</p>
                  <Link
                    to={`/users/${routine.creatorName}`}
                    className="text-blue-400"
                  >
                    {routine.creatorName}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No public routines found.</p>
          )}
        </Fragment>
      ) : (
        <p>{error}</p>
      )}

      <Link
        to={`/activities/${activityId}`}
        className="border-2 border-solid border-black p-2"
      >
        CLOSE
      </Link>
    </section>
  );
};

export default ActivityRoutines;
