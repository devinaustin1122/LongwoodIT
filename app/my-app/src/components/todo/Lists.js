import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

function Lists(props) {
  let history = useHistory();

  return (
    <ul className="list-group">
      {props.lists.map((list) => {
        return (
          <li
            onClick={() => {
              props.onClick(list);
            }}
            className="list-group-item pointer list"
            key={list.id}
          >
            <h1 className="lead">{list.name}</h1>
          </li>
        );
      })}
    </ul>
  );
}

export default Lists;
