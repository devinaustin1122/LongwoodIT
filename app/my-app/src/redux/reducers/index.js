import { combineReducers } from "redux";
import tasks from "./taskReducer.js";
import subtasks from "./subtaskReducer.js";

const rootReducer = combineReducers({
  tasks,
  subtasks,
});

export default rootReducer;
