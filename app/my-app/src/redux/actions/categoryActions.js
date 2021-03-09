export function loadCategories(id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/categories/" + id)
      .then((res) => res.json())
      .then((categories) => {
        dispatch({ type: "LOAD_CATEGORIES", categories });
      });
  };
}

export function saveCategory(description, list_id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/category/save/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        list_id,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        let saved = {
          ...id,
          description,
          list_id,
        };
        dispatch({ type: "SAVE_CATEGORY", saved });
      });
  };
}
