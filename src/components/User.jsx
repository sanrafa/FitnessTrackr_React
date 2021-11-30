import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

//API
import { getRoutinesByUser } from "../api";

import { UserContext } from "../App";

const User = () => {
  const { username } = useParams();
  const { token } = useContext(UserContext);

  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      const userRoutines = await getRoutinesByUser(token, username);
      setRoutines(userRoutines);
    }
    fetchRoutines();
  }, []);

  return (
    <main className="text-center">
      <h1 className="text-4xl">
        <span className="text-blue-500">{username}</span>'s Routines
      </h1>
      {routines ? (
        routines.map((routine) => (
          <div key={routine.id} className="p-4">
            <Link
              to={`/routines/${routine.id}`}
              className="text-xl text-blue-600"
            >
              {routine.name}
            </Link>
            <p>{routine.goal}</p>
            {routine.activities
              ? routine.activities.map((activity) => (
                  <div
                    key={activity.routineActivityId}
                    className="flex flex-col p-4"
                  >
                    <span className="text-blue-700 text-lg">
                      <Link to={`/activities/${activity.id}`}>
                        {activity.name}
                      </Link>
                    </span>
                    <span>Duration: {activity.duration} minutes</span>
                    <span>Count: {activity.count} reps</span>
                  </div>
                ))
              : null}
          </div>
        ))
      ) : (
        <p>This user doesn't have any routines yet.</p>
      )}
    </main>
  );
};

export default User;
