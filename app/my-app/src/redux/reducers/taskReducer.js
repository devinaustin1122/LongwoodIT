export default function taskReducer(state = { all: [], active: {} }, action) {
  switch (action.type) {
    case "TASK_SELECTED":
      return { all: state.all, active: action.task };
    case "DELETE_TASK":
      return {
        all: state.all.filter((task) => task.id !== action.task.id),
        active: state.active,
      };
    case "LOAD_TASKS_SUCCESS":
      return { all: action.tasks, active: state.active };
    case "SAVE_TASK_SUCCESS":
      return {
        all: [...state.all, action.saved],
        active: state.active,
      };
    case "STATUS_CHANGE":
      return {
        all: state.all.map((task) => {
          if (task.id === action.id) {
            let tmp = { ...task };
            tmp.status = action.status;
            return tmp;
          } else {
            return task;
          }
        }),
        active: state.active,
      };
    default:
      return state;
  }
}
