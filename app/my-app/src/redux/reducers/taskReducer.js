export default function taskReducer(state = { all: [], active: {} }, action) {
  switch (action.type) {
    case "TASK_SELECTED":
      return { all: state.all, active: action.task };
    case "DELETE_TASK":
      return {
        all: state.all.filter((task) => {
          return task.id !== action.id;
        }),
        active: state.active,
      };
    case "LOAD_TASKS":
      return {
        all: action.tasks,
        active: state.active,
      };

    // return { all: action.tasks, active: state.active };
    case "SAVE_TASK_SUCCESS":
      return {
        all: state.all.concat(action.saved),
        active: state.active,
      };
    case "EDIT_TASK":
      return {
        all: state.all.map((task) => {
          if (task.id === action.id) {
            return {
              id: task.id,
              category_id: task.category_id,
              description: action.description,
              list_id: task.list_id,
              status: task.status,
            };
          } else {
            return task;
          }
        }),
        active: state.active,
      };
    case "TASK_STATUS":
      return {
        all: state.all.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              complete: action.status,
            };
          } else {
            return task;
          }
        }),
        active: state.active,
      };
    case "STATUS_CHANGE":
      return {
        all: state.all,
        active: state.active,
      };
    default:
      return state;
  }
}
