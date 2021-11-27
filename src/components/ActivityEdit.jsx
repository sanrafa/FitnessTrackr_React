import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//API
import { getActivityById } from "../api";

const ActivityEdit = () => {
  let navigate = useNavigate();
  const { activityId } = useParams();

  const [toEdit, setToEdit] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function thisActivity() {
      const activity = await getActivityById(activityId);
      setToEdit(activity);
    }
    thisActivity();
  }, []);

  return (
    <section>
      <h1>Edit Activity</h1>
      <form>
        <label>
          Activity name:
          <input
            type="text"
            defaultValue={toEdit ? toEdit.name : null}
            size="60"
          ></input>
        </label>
        <label>
          Activity description:
          <input
            type="text"
            defaultValue={toEdit ? toEdit.description : null}
            size="60"
          ></input>
        </label>
        <button type="submit">EDIT</button>
      </form>
      <button type="button" onClick={() => navigate(-1)}>
        CANCEL
      </button>
    </section>
  );
};

export default ActivityEdit;
