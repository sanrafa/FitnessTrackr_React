import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

//API
import { getAllActivities } from "../api";

const ActivitiesAll = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllActivities() {
      setIsLoading(true);
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    }
    fetchAllActivities().then(() => setIsLoading(false));
  }, []);

  return (
    <main>
      {isLoading ? <p>Loading...</p> : null}
      <h1>Activities</h1>
      <Link to="new">Add an activity</Link>
      <Outlet />
      {activities
        ? activities.map((activity) => (
            <div key={activity.id}>
              <Link to={`${activity.id}`}>{activity.name}</Link>
              <p>{activity.description}</p>
            </div>
          ))
        : null}
    </main>
  );
};

export default ActivitiesAll;
