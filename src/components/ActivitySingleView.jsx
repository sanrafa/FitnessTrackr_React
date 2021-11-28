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
  let navigate = useNavigate();

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
        <article>
          <Link to="/activities">Back to all activities</Link>
          <h1>{activity.name}</h1>
          <p>{activity.description}</p>
          <NavLink
            to="routines"
            style={({ isActive }) =>
              isActive ? { display: "none" } : undefined
            }
          >
            View Routines
          </NavLink>
          {user && token ? <Link to={editPath}>Edit this activity</Link> : null}
        </article>
      ) : null}
      <Outlet />
    </main>
  );
};

export default ActivitySingleView;
