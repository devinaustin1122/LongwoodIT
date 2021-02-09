export default function listReducer(state = { all: [], active: {} }, action) {
  switch (action.type) {
    case "ADD_LIST":
      return { all: [...state.all, action], active: state.active };
    case "LOAD_LISTS":
      return { all: action.lists, active: state.active };
    case "LIST_SELECTED":
      return { all: state.all, active: action.list };
    default:
      return state;
  }
}
