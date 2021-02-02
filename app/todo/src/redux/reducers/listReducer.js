export default function subtaskReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_LIST":
      console.log([...state, { list: action.id }]);
      return state;
    default:
      return state;
  }
}
