import { Outlet, useParams } from "react-router-dom";

const ActivitySingleView = () => {
  const { activityId } = useParams();

  return (
    <main>
      <h1>This Activity</h1>
      <Outlet />
    </main>
  );
};

export default ActivitySingleView;
