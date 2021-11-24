import { useEffect, useState } from "react";
import Loader from "./Loader";

import { getAllActivities } from "../api";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    };
    fetchActivities().then(() => setIsLoading(false));
  }, []);
  return (
    <div>
      {isLoading ? <Loader /> : null}
      <h1>Activities</h1>
      {activities.length > 0 ? (
        <section>
          {activities.map((activity) => (
            <div key={activity.id}>
              <h2>{activity.name}</h2>
              <p>{activity.description}</p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default Activities;
