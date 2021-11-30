import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

//API
import { getActivityById, editActivity } from "../api";

import { UserContext } from "../App";

const ActivityEdit = () => {
  let navigate = useNavigate();
  const { activityId } = useParams();
  const { user, token } = useContext(UserContext);

  const [toEdit, setToEdit] = useState({}); // default values
  const [edited, setEdited] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState({}); // returned edited activity after successful call
  const [error, setError] = useState("");

  useEffect(() => {
    async function thisActivity() {
      const activity = await getActivityById(activityId);
      setToEdit(activity);
    }
    thisActivity();
  }, []);

  useEffect(() => {
    if (Object.keys(activity).length > 0) setEdited(true);
  }, [activity]);

  const sendEdit = async (activity) => {
    try {
      if (user && token) {
        const updated = await editActivity(token, activity);
        console.log(updated);
        setActivity(updated);
      } else {
        throw Error(
          "You are not authorized to perform this action; please log in again."
        );
      }
    } catch (err) {
      console.error(err);
      if (typeof err === "object") err = err.message;
      setError(err);
    }
  };

  const handleSubmit = async () => {
    const editedActivity = {};
    name
      ? (editedActivity.name = name.toLowerCase())
      : (editedActivity.name = toEdit.name);
    description
      ? (editedActivity.description = description)
      : (editedActivity.description = toEdit.description);
    editedActivity.id = activityId;

    await sendEdit(editedActivity);
  };

  return (
    <section>
      {!edited ? <h1 className="text-2xl">Edit Activity</h1> : null}

      {error ? (
        <p>{error}</p>
      ) : !edited ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col p-4 space-y-4"
        >
          <label className="font-medium">
            Activity name:
            <input
              type="text"
              className="ml-4 border-blue-100 border-2 p-2"
              defaultValue={toEdit ? toEdit.name : null}
              size="60"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          <label className="font-medium">
            Description:
            <input
              type="text"
              className="ml-4 border-blue-100 border-2 p-2"
              defaultValue={toEdit ? toEdit.description : null}
              size="60"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </label>
          <button type="submit" className="bg-blue-500 text-white">
            EDIT
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-red-700"
          >
            CANCEL
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <p>
            <em>This activity has been edited</em>
          </p>
          <p className="font-bold">{activity.name}</p>
          <p>{activity.description}</p>
          <button type="button" onClick={() => navigate("/activities")}>
            EXIT
          </button>
        </div>
      )}
    </section>
  );
};

export default ActivityEdit;
