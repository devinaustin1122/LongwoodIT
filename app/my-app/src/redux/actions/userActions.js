import { store } from "react-notifications-component";

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
        user,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        if (id.id !== "") {
          store.addNotification({
            title: "Success",
            message: "Your are logged in as " + id.id,
            type: "success", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000,
            },
          });
          dispatch({ type: "LOGIN", user, ...id });
        } else {
          store.addNotification({
            title: "Authentication failure",
            message: "Incorrect username or email",
            type: "danger", // 'default', 'success', 'info', 'warning'
            container: "top-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000,
            },
          });
        }
      });
  };
}
