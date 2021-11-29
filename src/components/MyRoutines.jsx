import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// API
import { getRoutinesByUser } from "../api";

import { UserContext } from "../App";

const MyRoutines = () => {
  const { user, token } = useContext(UserContext);

  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserRoutines() {
      if (!user || !token) {
        setError("You must be logged in to view this page.");
        return;
      }
      try {
        let username = user.username;
        const userRoutines = await getRoutinesByUser(token, username);
        setRoutines(userRoutines);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }
    getUserRoutines();
  }, []);

  return (
    <main>
      <h1>My Routines</h1>
      {error ? <p>{error}</p> : null}
      {routines.length > 0 ? (
        routines.map((routine) => (
          <div key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
            <p>{routine.goal}</p>
            {!routine.isPublic ? (
              <span>
                <em> Private routine</em>
              </span>
            ) : null}
          </div>
        ))
      ) : routines.length === 0 && user && token ? (
        <p>
          Looks like you haven't created a routine yet. Click{" "}
          <Link to="/routines/new">here</Link> to create a new routine!
        </p>
      ) : null}
    </main>
  );
};

export default MyRoutines;
