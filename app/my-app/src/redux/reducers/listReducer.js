export default function listReducer(state = { all: [], active: {} }, action) {
  switch (action.type) {
    case "CREATE_LIST":
      return state;
    case "LOAD_LISTS":
      return { all: action.lists, active: state.active };
    case "LIST_SELECTED":
      return { all: state.all, active: action.list };
    case "DELETE_LIST":
      return {
        all: state.all.filter((list) => {
          return list.id != action.id;
        }),
        active: state.active,
      };
    default:
      return state;
  }
}
