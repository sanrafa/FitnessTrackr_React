import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

//API
import { getAllActivities } from "../api";

import { UserContext } from "../App";

const ActivitiesAll = () => {
  const { user, token } = useContext(UserContext);

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
      <h1 className="text-4xl">Activities</h1>
      {user && token ? <Link to="new">Add an activity</Link> : null}
      <Outlet />
      {activities
        ? activities.map((activity) => (
            <div key={activity.id} className="p-4">
              <Link
                to={`${activity.id}`}
                className="text-blue-500 font-bold text-2xl"
              >
                {activity.name}
              </Link>
              <p>{activity.description}</p>
            </div>
          ))
        : null}
    </main>
  );
};

export default ActivitiesAll;
