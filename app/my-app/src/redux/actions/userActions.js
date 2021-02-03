export function login(user, password) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        debugger;
        dispatch({ type: "LOGIN", user, ...id });
      });
  };
}
