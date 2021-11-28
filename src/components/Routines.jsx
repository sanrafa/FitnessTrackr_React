import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import RoutinesAll from "./RoutinesAll";
import RoutineNew from "./RoutineNew";
import RoutineEdit from "./RoutineEdit";
import RoutineSingleView from "./RoutineSingleView";

/* 
  Use this for main routines route,
  including routes:
    - routines/ (all routines)
    - routines/new (create a new routine, also accessible from /profile)
    - routines/:routineId (single routine view - accessible if public/owned)
    - routines/:routineId/edit (edit routine if owned)
*/

const Routines = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<RoutinesAll />} />
        <Route path="new" element={<RoutineNew />} />
        <Route path="/:routineId" element={<RoutineSingleView />} />
        <Route path="/:routineId/edit" element={<RoutineEdit />} />
      </Routes>
    </Fragment>
  );
};

export default Routines;
