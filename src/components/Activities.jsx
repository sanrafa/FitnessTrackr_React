import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

//COMPONENTS
import ActivitiesAll from "./ActivitiesAll";
import ActivitiesNew from "./ActivitiesNew";
import ActivitySingleView from "./ActivitySingleView";
import ActivityEdit from "./ActivityEdit";
import ActivityRoutines from "./ActivityRoutines";
/* 
* TODO:
* Turn this into main activity route page,
* split page functions into separate components.
* Nest each option in routes, i.e.:
    - activities/    (index, all activities)
    - activities/new (new activity form)
    - activities/:id (single activity view)
      - activities/:id/edit (edit an activity)
*/

const Activities = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<ActivitiesAll />}>
          <Route path="new" element={<ActivitiesNew />} />
        </Route>

        <Route path="/:activityId" element={<ActivitySingleView />}>
          <Route path="routines" element={<ActivityRoutines />} />
          <Route path="edit" element={<ActivityEdit />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default Activities;
