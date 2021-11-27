import { useEffect, useState, Fragment } from "react";
import { Routes, Route } from "react-router";

import { getAllActivities } from "../api";

//COMPONENTS
import ActivitiesAll from "./ActivitiesAll";
import ActivitiesNew from "./ActivitiesNew";
import ActivitySingleView from "./ActivitySingleView";
import ActivityEdit from "./ActivityEdit";
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
        <Route path="/" element={<ActivitiesAll />} />
        <Route path="/new" element={<ActivitiesNew />} />
        <Route path="/:activityId" element={<ActivitySingleView />}>
          <Route path="edit" element={<ActivityEdit />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default Activities;
