import { store } from "react-notifications-component";

export function deleteTask(task) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/delete/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
      }),
    }).then(() => {
      dispatch({ type: "DELETE_TASK", task });
    });
  };
}

export function loadTasks(id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/tasks/" + id)
      .then((res) => res.json())
      .then((tasks) => {
        dispatch({ type: "LOAD_TASKS_SUCCESS", tasks });
      });
  };
}

export function saveTask(task, list) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/saveTask/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task.description,
        list: list.id,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        let saved = {
          ...id,
          status: "NS",
          description: task.description,
          list_id: list.id,
        };
        dispatch({ type: "SAVE_TASK_SUCCESS", saved });
      });
  };
}

export function updateStatus(task, status) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/status/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        status,
      }),
    }).then(() => {
      store.addNotification({
        title: "Success",
        message: "The status has been updated ",
        type: "default", // 'default', 'success', 'info', 'warning'
        container: "top-right", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000,
        },
      });
      dispatch({ type: "STATUS_CHANGE", id: task.id, status });
      // debugger;
      // store
      //   .addNotification({
      //     title: "Success",
      //     message: "Status updated",
      //     type: "defualt", // 'default', 'success', 'info', 'warning'
      //     container: "top-right", // where to position the notifications
      //     animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      //     animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      //     dismiss: {
      //       duration: 3000,
      //     },
      //   })
      //   .then(() => {
      //     dispatch({ type: "STATUS_CHANGE", id: task.id, status });
      //   });
    });
  };
}

export function selectTask(task) {
  return { type: "TASK_SELECTED", task };
}
