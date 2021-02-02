export function saveSubtask(subtask, task_id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/saveSubtask/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtask: subtask.description,
        task_id,
      }),
    })
      .then((res) => res.json())
      .then((id) => dispatch({ type: "ADD_SUBTASK", id, subtask, task_id }));
  };
}

export function loadSubtasks(id) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/subtasks/" + id)
      .then((res) => res.json())
      .then((subtasks) => {
        dispatch({ type: "LOAD_SUBTASKS", subtasks });
      });
  };
}

export function deleteSubtask(subtask) {
  return function (dispatch) {
    return fetch("http://localhost:9000/toDoAPI/deleteSubtask/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: subtask.id,
      }),
    }).then(() => {
      dispatch({ type: "DELETE_SUBTASK", subtask });
    });
  };
}
