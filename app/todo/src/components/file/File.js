import React from "react";

const File = () => {
  return (
          <div className="fade-in">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Fluid jumbotron</h1>
          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>
      <div className="d-flex">
        <div className="card black-t text-light m-3" style={{ width: "200px" }}>
          <div className="card-body">
            <h5 className="card-title lead">Create New ToDo List</h5>
            <a className="pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="180"
                fill="currentColor"
                className="bi bi-file-earmark-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="card black-t text-light m-3" style={{ width: "200px" }}>
          <div className="card-body">
            <h5 className="card-title lead">Delete ToDo List</h5>
            <a className="pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="180"
                fill="currentColor"
                className="bi bi-file-earmark-minus"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="card black-t text-light m-3" style={{ width: "200px" }}>
          <div className="card-body">
            <h5 className="card-title lead">Open ToDo List</h5>
            <a className="pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="180"
                fill="currentColor"
                className="bi bi-file-earmark-arrow-up"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default File;
