/* eslint react/prop-types: 0 */
/* eslint react/jsx-key: 0 */

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const TaskSubmit = props => {
  const [inputTask, setInputTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(inputTask);
    setInputTask("");
  };

  const handleInputChange = (event) => {
    setInputTask(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3 w-75">
        <FormControl onChange={handleInputChange} value={inputTask} placeholder="Enter a task" />
        <InputGroup.Append>
          <Button variant="secondary" type="submit">Add task</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );

}

const TaskList = props => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const 

  onDragEnd = type => result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.tasks,
      result.source.index,
      result.destination.index
    );

    props.setList(items, type);
  }

  return (<DragDropContext onDragEnd={onDragEnd(props.type)}>
    <Droppable droppableId={props.type}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {props.tasks.map((item, index) => (
            <Draggable key={item.task} draggableId={item.task} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Task key={item.task} onClick={props.onClick} {...item} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  );
}

const Task = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskInput, setTaskInput] = useState(props.task);
  const [urgencyLevel, setUrgencyLevel] = useState("urgency-low");

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  }

  const handleSave = () => {
    props.onClick("edit", taskInput, props.task);
    setIsOpen(false);
  }

  const handleClick = () => {
    if (urgencyLevel === "urgency-high") {
      setUrgencyLevel("urgency-low");
    } else {
      setUrgencyLevel("urgency-high");
    }
  }

  return (
    <div className="d-flex">
      <p className={`pr-1 ${urgencyLevel}`}>{props.task}</p>
      <Dropdown className="ml-auto">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Status
            </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => { props.onClick("upcoming", props.task) }}>Upcoming</Dropdown.Item>
          <Dropdown.Item onSelect={() => { props.onClick("inProgress", props.task) }}>In progress</Dropdown.Item>
          <Dropdown.Item onSelect={() => { props.onClick("complete", props.task) }}>Complete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ButtonGroup className="align-self-start pl-1">
        <Button className="btn-clear" type="button" onClick={() => { handleClick() }}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-lightning" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z" />
          </svg>
        </Button>
        <Button className="btn-clear" type="button" onClick={() => { setIsOpen(true) }}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </Button>
        <Button className="btn-clear" type="button" value="delete" onClick={() => { props.onClick("delete", props.task) }} style={{ color: "#FFFFFF" }}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </ButtonGroup>

      <Modal show={isOpen} onHide={() => { setIsOpen(false) }}>
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <textarea value={taskInput} onChange={handleInputChange} className="w-100"></textarea>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button onClick={() => { setIsOpen(false) }}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaskList;
export { TaskSubmit, TaskList };