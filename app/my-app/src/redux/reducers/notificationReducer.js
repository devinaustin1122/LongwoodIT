export default function listReducer(state = [], action) {
  switch (action.type) {
    case "NOTIFICATION":
      return [...state, action.notification];
    default:
      return state;
  }
}
