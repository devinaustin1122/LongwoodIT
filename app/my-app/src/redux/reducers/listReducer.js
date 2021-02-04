export default function listReducer(state = [], action) {
  switch (action.type) {
    case "ADD_LIST":
      return [...state, action];
    case "LOAD_LISTS":
      return action.lists;
    default:
      return state;
  }
}
