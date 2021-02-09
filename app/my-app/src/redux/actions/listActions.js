export function createList(user, name) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/list/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user,
      }),
    })
      .then((res) => res.json())
      .then((id) => dispatch({ type: "ADD_LIST", ...id, user, name }));
  };
}

export function loadLists(user) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/lists/" + user)
      .then((res) => res.json())
      .then((lists) => {
        dispatch({ type: "LOAD_LISTS", lists });
      });
  };
}
export function selectList(list) {
  return { type: "LIST_SELECTED", list };
}
