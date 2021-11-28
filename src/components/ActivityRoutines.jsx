import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// API
import { getRoutinesByActivity } from "../api";

const ActivityRoutines = () => {
  const [routines, setRoutines] = useState([]);

  const { activityId } = useParams();

  useEffect(() => {
    async function fetchRoutines() {
      const allRoutines = await getRoutinesByActivity(activityId);
      setRoutines(allRoutines);
    }
    fetchRoutines();
  }, []);

  return (
    <section>
      <h3>Featured in:</h3>
      {routines ? (
        <div>
          {routines.map((routine) => (
            <div key={routine.id}>
              <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
              <p>{routine.goal}</p>
              <Link to={`/users/${routine.creatorName}/routines`}>
                {routine.creatorName}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        "No associated routines"
      )}
    </section>
  );
};

export default ActivityRoutines;
