// Thunks

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

export function loadTasks() {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/tasks/")
      .then((res) => res.json())
      .then((tasks) => {
        dispatch({ type: "LOAD_TASKS_SUCCESS", tasks });
      });
  };
}

export function saveTask(task) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/saveTask/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task.description,
      }),
    })
      .then((res) => res.json())
      .then((id) => {
        dispatch({ type: "SAVE_TASK_SUCCESS", task, id });
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
      dispatch({ type: "STATUS_CHANGE", id: task.id, status });
    });
  };
}

export function selectTask(task) {
  return { type: "TASK_SELECTED", task };
}
