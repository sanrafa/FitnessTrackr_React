import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//API
import { getAllRoutines } from "../api";

const RoutinesAll = () => {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRoutines() {
      try {
        setIsLoading(true);
        const allRoutines = await getAllRoutines();
        setRoutines(allRoutines);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to get routines. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoutines();
  }, []);

  return (
    <main>
      {isLoading ? <p>Loading...</p> : null}
      {error ? (
        <p>{error}</p>
      ) : routines ? (
        <article>
          <h1>Routines</h1>
          {routines
            ? routines.map((routine) => (
                <div key={routine.id}>
                  <Link to={`${routine.id}`}>{routine.name}</Link>
                  <p>
                    Creator:{" "}
                    <Link to={`/users/${routine.creatorName}/routines`}>
                      {routine.creatorName}
                    </Link>
                  </p>
                  <p>{routine.goal}</p>
                  {routine.activities ? (
                    routine.activities.map((activity) => (
                      <div key={activity.routineActivityId}>
                        <span>
                          <Link to={`/activities/${activity.id}/routines`}>
                            {activity.name}
                          </Link>
                        </span>
                        <span>Duration: {activity.duration} minutes</span>
                        <span>Count: {activity.count} reps</span>
                      </div>
                    ))
                  ) : (
                    <p>No associated activities</p>
                  )}
                </div>
              ))
            : null}
        </article>
      ) : null}
    </main>
  );
};

export default RoutinesAll;
