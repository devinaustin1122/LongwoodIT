export default function taskReducer(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      if (action.user === action.id) {
        return action.id;
      } else {
        return state;
      }
    default:
      return state;
  }
}
