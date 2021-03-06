import { combineReducers } from "redux";
import tasks from "./taskReducer.js";
import subtasks from "./subtaskReducer.js";
import users from "./userReducer.js";
import lists from "./listReducer.js";

const rootReducer = combineReducers({
  tasks,
  subtasks,
  users,
  lists,
});

export default rootReducer;
