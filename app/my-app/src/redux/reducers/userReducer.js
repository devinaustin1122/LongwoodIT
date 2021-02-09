export default function userReducer(state = { active: "" }, action) {
  switch (action.type) {
    case "LOGIN":
      if (action.user !== "") {
        return { active: action.id };
      } else {
        return { active: "dyerda" };
      }
    default:
      return state;
  }
}
