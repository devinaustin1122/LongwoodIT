export default function taskReducer(state = [], action) {
  switch (action.type) {
    case "TASK_SELECTED":
      return [...state, { active: action.task }];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.task.id);
    case "LOAD_TASKS_SUCCESS":
      return action.tasks;
    case "SAVE_TASK_SUCCESS":
      return [...state, { ...action.task, ...action.id, status: "NS" }];
    case "STATUS_CHANGE":
      return state.map((task) => {
        if (task.id === action.id) {
          let tmp = { ...task };
          tmp.status = action.status;
          return tmp;
        } else {
          return task;
        }
      });
    default:
      return state;
  }
}
