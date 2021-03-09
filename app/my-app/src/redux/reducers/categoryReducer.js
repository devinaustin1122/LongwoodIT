export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return action.categories;
    case "SAVE_CATEGORY":
      return state.concat(action.saved);
    default:
      return state;
  }
}
