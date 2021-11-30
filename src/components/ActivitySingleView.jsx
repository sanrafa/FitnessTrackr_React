import { useState, useEffect, useContext } from "react";
import {
  Outlet,
  useParams,
  Link,
  generatePath,
  NavLink,
  useNavigate,
} from "react-router-dom";

//API
import { getActivityById } from "../api";

import { UserContext } from "../App";

const ActivitySingleView = () => {
  const { activityId } = useParams();
  const editPath = generatePath("/activities/:activityId/edit", {
    activityId: activityId,
  });
  const { user, token } = useContext(UserContext);

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
        <article className="text-center">
          <Link to="/activities" className="text-blue-300">
            Back to all activities
          </Link>
          <h1 className="text-3xl">{activity.name}</h1>
          <p className="text-lg">{activity.description}</p>
          <NavLink
            to="routines"
            style={({ isActive }) =>
              isActive ? { display: "none" } : undefined
            }
            className="mr-4 text-blue-500"
          >
            View Routines
          </NavLink>
          {user && token ? (
            <Link to={editPath} className="text-blue-700">
              Edit this activity
            </Link>
          ) : null}
        </article>
      ) : null}
      <Outlet />
    </main>
  );
};

export default ActivitySingleView;
