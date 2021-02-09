export default function taskReducer(
  state = { all: { NS: [], IP: [], C: [] }, active: {} },
  action
) {
  switch (action.type) {
    case "TASK_SELECTED":
      return { all: state.all, active: action.task };
    case "DELETE_TASK":
      return {
        all: {
          NS: state.all.NS.filter((task) => {
            return task.id == action.task.id;
          }),
          IP: state.all.IP.filter((task) => {
            return task.id == action.task.id;
          }),
          C: state.all.C.filter((task) => {
            return task.id == action.task.id;
          }),
        },
        // all: state.all.filter((list) => list.filter((task) => {return task.id !== action.task.id})),
        active: state.active,
      };
    case "LOAD_TASKS_SUCCESS":
      return {
        all: {
          NS: action.tasks.filter((task) => {
            return task.status === "NS";
          }),
          IP: action.tasks.filter((task) => {
            return task.status === "IP";
          }),
          C: action.tasks.filter((task) => {
            return task.status === "C";
          }),
        },
        active: state.active,
      };

    // return { all: action.tasks, active: state.active };
    case "SAVE_TASK_SUCCESS":
      return {
        all: {
          NS: [...state.all.NS, action.saved],
          IP: state.all.IP,
          C: state.all.C,
        },
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
