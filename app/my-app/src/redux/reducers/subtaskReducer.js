export default function subtaskReducer(state = [], action) {
  switch (action.type) {
    case "ADD_SUBTASK":
      console.log([
        ...state,
        {
          id: action.id,
          description: action.subtask.description,
          task_id: action.task_id,
        },
      ]);
      return [
        ...state,
        {
          id: action.id,
          description: action.subtask.description,
          task_id: action.task_id,
        },
      ];
    case "LOAD_SUBTASKS":
      return action.subtasks;
    case "DELETE_SUBTASK":
      return state.filter((subtask) => subtask.id !== action.subtask.id);
    default:
      return state;
  }
}
