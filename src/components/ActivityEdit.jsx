import { useNavigate } from "react-router-dom";

const ActivityEdit = () => {
  let navigate = useNavigate();

  return (
    <section>
      <h1>Edit Activity</h1>
      <button type="button" onClick={() => navigate(-1)}>
        CANCEL
      </button>
    </section>
  );
};

export default ActivityEdit;
