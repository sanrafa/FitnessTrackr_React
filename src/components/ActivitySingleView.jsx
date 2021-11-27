import { useState, useEffect } from "react";
import { Outlet, useParams, Link, generatePath } from "react-router-dom";

//API
import { getActivityById } from "../api";

const ActivitySingleView = () => {
  const { activityId } = useParams();
  const editPath = generatePath("/activities/:activityId/edit", {
    activityId: activityId,
  });

  const [activity, setActivity] = useState({});

  useEffect(() => {
    async function fetchActivity() {
      const selectedActivity = await getActivityById(activityId);
      setActivity(selectedActivity);
    }
    fetchActivity();
  }, []);

  return (
    <main>
      {activity ? (
        <article>
          <Link to="/activities">Back to all activities</Link>
          <h1>{activity.name}</h1>
          <p>{activity.description}</p>
          <Link to={editPath}>Edit this activity</Link>
        </article>
      ) : null}
      <Outlet />
    </main>
  );
};

export default ActivitySingleView;
