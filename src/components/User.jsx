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
    <main>
      <h1>{username}'s Routines</h1>
      {routines ? (
        routines.map((routine) => (
          <div key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
            <p>{routine.goal}</p>
            {routine.activities
              ? routine.activities.map((activity) => (
                  <div key={activity.routineActivityId}>
                    <span>
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
