import { useEffect, useState } from "react";
import Loader from "./Loader";

import { getAllRoutines } from "../api";

const Routines = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const allRoutines = await getAllRoutines();
      setRoutines(allRoutines);
    };
    fetchRoutines().then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : null}
      <h1>All Routines</h1>
      {routines.length > 0 ? (
        <section>
          {routines.map((routine) => (
            <div key={routine.id}>
              <h2>{routine.name}</h2>
              <h3>{routine.goal}</h3>
              <p>Created by: {routine.creatorName}</p>
              <h4>Activities</h4>
              {routine.activities.map((activity) => (
                <div key={activity.id}>
                  <span>
                    <strong>{activity.name}</strong>
                  </span>
                  <span>Duration: {activity.duration}</span>
                  <span>Count: {activity.count} minutes</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default Routines;
