import React from "react";

const ListsFlex = (props) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      {props.lists.map((list) => {
        return (
          <div
            onClick={() => {
              props.onClick(list);
            }}
            key={list.id}
            className="list-flex pointer"
          >
            <h2 className="lead">{list.name}</h2>
            <hr />
            <p className="lead">{list.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ListsFlex;
