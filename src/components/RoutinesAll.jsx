import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

//API
import { getAllRoutines } from "../api";

import { UserContext } from "../App";

const RoutinesAll = () => {
  const { user } = useContext(UserContext);

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
          <h1 className="text-4xl">Routines</h1>
          {user.id ? (
            <Link to="new" className="text-blue-600">
              Create a new routine
            </Link>
          ) : null}
          {routines
            ? routines.map((routine) => (
                <div key={routine.id} className="p-4">
                  <Link
                    to={`${routine.id}`}
                    className="text-blue-500 font-bold text-2xl"
                  >
                    {routine.name}
                  </Link>
                  <p>
                    Creator:{" "}
                    <Link
                      to={`/users/${routine.creatorName}`}
                      className="text-blue-400"
                    >
                      {routine.creatorName}
                    </Link>
                  </p>
                  <p className="text-xl">{routine.goal}</p>
                  {routine.activities ? (
                    routine.activities.map((activity) => (
                      <div
                        key={activity.routineActivityId}
                        className="flex-col p-4"
                      >
                        <p>
                          <Link
                            to={`/activities/${activity.id}/routines`}
                            className="font-semibold"
                          >
                            {activity.name}
                          </Link>
                        </p>
                        <p>Duration: {activity.duration} minutes</p>
                        <p>Count: {activity.count} reps</p>
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
