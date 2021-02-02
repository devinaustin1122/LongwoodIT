import { combineReducers } from "redux";
import tasks from "./taskReducer.js";
import subtasks from "./subtaskReducer.js";
import list from "./listReducer.js";

const rootReducer = combineReducers({
  tasks,
  subtasks,
  list,
});

export default rootReducer;
