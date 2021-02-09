export default function taskReducer(state = { active: "" }, action) {
  switch (action.type) {
    case "LOGIN":
      if (action.user === action.id) {
        return { active: action.id };
      } else {
        return { active: "dyerda" };
      }
    default:
      return state;
  }
}
