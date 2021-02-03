import { combineReducers } from "redux";
import tasks from "./taskReducer.js";
import subtasks from "./subtaskReducer.js";
import user from "./userReducer";

const rootReducer = combineReducers({
  tasks,
  subtasks,
  user,
});

export default rootReducer;
