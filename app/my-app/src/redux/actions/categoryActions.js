export function loadCategories(id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/categories/" + id)
      .then((res) => res.json())
      .then((categories) => {
        dispatch({ type: "LOAD_CATEGORIES", categories });
      });
  };
}
