export function createList(name) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/list/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        dispatch({ type: "CREATE_LIST", id });
      });
  };
}
