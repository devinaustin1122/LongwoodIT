/* eslint react/prop-types: 0 */
/* eslint react/jsx-key: 0 */

import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TaskList, TaskSubmit } from './TaskList.js';
import Report from './Report.js';
import JSONSafe from './Util.js';


class App extends React.Component {
  constructor(props) {
    const curDate = new Date()
    super(props);
    this.state = {
      notStarted: [],
      inProgress: [],
      complete: [],
      report: [],
      dates: [],
      user: "",
      users: [],
      date: curDate.getUTCFullYear() + '-' + (curDate.getUTCMonth() + 1) + '-' + curDate.getUTCDate(),
      showHideTaskList: false,
      showHome: false,
      showReport: false,
      login: false,
    };
    this.showComponent = this.showComponent.bind(this);
  }

  // Controls displayed components
  showComponent(name) {
    switch (name) {
      case "ToDo":
        this.setState({ showHideTaskList: true, showReport: false, showHome: false })
        break;
      case "Home":
        this.setState({ showHideTaskList: false, showReport: false, showHome: true })
        break;
      case "Report":
        this.setState({ showHideTaskList: false, showHome: false, showReport: true })
        break;
      case "Login":
        this.setState({ login: true, showHome: true })
        break;
      default:
    }
  }

  // Fetches task list data from toDoAPI
  async fetchData() {
    await fetch('http://localhost:9000/toDoAPI/tasks/' + this.state.date.substring(0, 10) + '/' + this.state.user)
      .then(res => res.json())
      .then(
        (result) => {
          if (Object.keys(result).length !== 0) {
            this.setState({
              isLoaded: true,
              inProgress: JSON.parse(result[0].tasks).inProgress,
              notStarted: JSON.parse(result[0].tasks).notStarted,
              complete: JSON.parse(result[0].tasks).completed,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    await fetch('http://localhost:9000/toDoAPI/report')
      .then(res => res.json())
      .then(
        (result) => {
          if (Object.keys(result).length !== 0) {
            this.setState({
              report: result,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    await this.updateSaved();
  }

  // Sets the date being used to retrieve and edit lists and reports
  async setDate(value) {
    await this.setState({
      date: value
    })
    this.fetchData();
  }

  // Update the saved lists. Lists are labeled by the date they were created
  async updateSaved() {
    const result = await fetch('http://localhost:9000/toDoAPI/dates/' + this.state.user)
      .then(res => res.json())

    this.setState({
      dates: result,
    })
  }

  // Posts list data to toDoAPI
  save = async () => {

    await fetch('http://localhost:9000/toDoAPI', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskList: {
          user: this.state.user,
          date: this.state.date,
          tasks: {
            inProgress: this.state.inProgress.map((item) => {return {task: JSONSafe(item.task)}}),
            notStarted: this.state.notStarted.map((item) => {return {task: JSONSafe(item.task)}}),
            completed: this.state.complete.map((item) => {return {task: JSONSafe(item.task)}})
          }
        }
      })
    })

    this.updateSaved();
    this.fetchData();
  }

  // Deletes task list
  deleteTaskList = async (dateInput) => {
    await fetch('http://localhost:9000/toDoAPI/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateInput,
        user: this.state.user
      }),
    })

    this.updateSaved();
    this.fetchData();
  }

  // Downloads the task list to a text file
  download = () => {
    const element = document.createElement("a");
    var file = "Upcoming:";

    for (let i = 0; i < this.state.notStarted.length; i++) {
      file = file + "\r\n\t-- " + this.state.notStarted[i]["task"];
    }

    file = file + "\r\nIn progress:";

    for (let i = 0; i < this.state.inProgress.length; i++) {
      file = file + "\r\n\t-- " + this.state.inProgress[i]["task"];
    }

    file = file + "\r\nComplete:";

    for (let i = 0; i < this.state.complete.length; i++) {
      file = file + "\r\n\t-- " + this.state.complete[i]["task"];
    }

    const blob = new Blob([file], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = "report-" + this.state.date + ".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  // Clears ToDo list to allow a new entry
  new = () => {
    const curDate = new Date()
    this.setState({
      notStarted: [],
      inProgress: [],
      complete: [],
      date: curDate.getUTCFullYear() + '-' + (curDate.getUTCMonth() + 1) + '-' + curDate.getUTCDate(),
    })
  }

  // Adds new task
  addNewTask = (taskAdd) => {
    this.setState(prevState => ({
      notStarted: [...prevState.notStarted, { "task": taskAdd }]
    }));
  };

  // Deletes task
  deleteTask = (taskInput) => {
    this.setState(prevState => ({
      notStarted: prevState.notStarted.filter((item) => item.task !== taskInput),
      complete: prevState.complete.filter((item) => item.task !== taskInput),
      inProgress: prevState.inProgress.filter((item) => item.task !== taskInput),
    }));
  }

  // Updates task status. (Ex: In progress, complete, etc)
  updateTaskStatus = (action, taskInput, taskUpdate) => {
    if (action === "inProgress") {
      this.deleteTask(taskInput);
      this.setState(prevState => ({
        inProgress: [...prevState.inProgress, { "task": taskInput }]
      }));
    } else if (action === "upcoming") {
      this.deleteTask(taskInput);
      this.setState(prevState => ({
        notStarted: [...prevState.notStarted, { "task": taskInput }]
      }));
    } else if (action === "complete") {
      this.deleteTask(taskInput);
      this.setState(prevState => ({
        complete: [...prevState.complete, { "task": taskInput }]
      }));
    } else if (action === "edit") {
      var index = this.state.notStarted.findIndex(function (item, i) {
        return item.task === taskUpdate;
      });

      if (index >= 0) {
        this.state.notStarted.splice(index, 1, { task: taskInput, type: "notStarted" })
        this.setState(() => ({
          notStarted: this.state.notStarted,
        }));
      }

      index = this.state.inProgress.findIndex(function (item, i) {
        return item.task === taskUpdate;
      });

      if (index >= 0) {
        this.state.inProgress.splice(index, 1, { task: taskInput, type: "inProgress" })
        this.setState(() => ({
          inProgress: this.state.inProgress,
        }));
      }

      index = this.state.complete.findIndex(function (item, i) {
        return item.task === taskUpdate;
      });

      if (index >= 0) {
        this.state.complete.splice(index, 1, { task: taskInput, type: "complete" })
        this.setState(() => ({
          complete: this.state.complete,
        }));
      }
    } else if (action === "delete") {
      this.deleteTask(taskInput);
    }
  }

  // Sets the current user to the given username
  setUser = async (username) => {
    await this.setState({ user: username });
    this.fetchData();
  }

  setList = (newList, key) => {
    if (key === "complete") {
      this.setState({
        complete: newList
      })
    } else if (key === "inProgress") {
      this.setState({
        inProgress: newList
      })
    } else {
      this.setState({
        notStarted: newList
      })
    }
  }

  render() {
    console.log("rendered")
    return (
      <>
        {
          !this.state.login && (<Login onSubmit={(username) => { this.showComponent("Login"); this.setUser(username) }} />)
        }
        {
          this.state.login && (<Navbar variant="dark" className="bg-dark-tg">
            <Navbar.Brand className="txt-blue">Longwood IT</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => { this.showComponent("Home") }}>Home</Nav.Link>
              <Nav.Link onClick={() => { this.showComponent("Report") }}>Report</Nav.Link>
              <Nav.Link onClick={() => { this.showComponent("ToDo") }}>ToDo</Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {
                  this.state.showHideTaskList && (<NavDropdown title="Saved" id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={() => this.new()}>
                      New
                    </NavDropdown.Item>
                    {this.state.dates.map((item) =>
                      <NavDropdown.Item key={item.date.substring(0, 10)}>
                        <span onClick={() => { this.setDate(item.date.substring(0, 10)) }}>{item.date.substring(0, 10)}</span>
                        <Button className="btn-secondary btn-clear ml-1" onClick={() => { this.deleteTaskList(item.date.substring(0, 10)) }}>
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                          </svg>
                        </Button>
                      </NavDropdown.Item>)}
                  </NavDropdown>)
                }
              </Nav>
            </Navbar.Collapse>
            <Navbar.Brand>
              {this.state.user}
            </Navbar.Brand>
            <Navbar.Brand>
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bootstrap" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 1H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4z" />
                <path fillRule="evenodd" d="M8.537 12H5.062V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396zM6.375 4.658v2.467h1.558c1.16 0 1.764-.428 1.764-1.23 0-.78-.569-1.237-1.541-1.237H6.375zm1.898 6.229H6.375V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377z" />
              </svg>
            </Navbar.Brand>
          </Navbar>
          )}
        {
          this.state.showHome && (<Container fluid>
            <Jumbotron className="bg-dark-t text-light m-5 p-4">
              <Row>
                <Col md={5}>
                  <h1>Organize your week and learn about other&apos;s</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    {`It's not only writers who can benefit from this free online tool. If you're a programmer who's working on a project where blocks of text are needed, this tool can be a great way to get that. It's a good way to test your programming and that the tool being created is working well.`}
                  </p>
                </Col>
              </Row>
            </Jumbotron>
          </Container>)
        }
        {
          this.state.showHideTaskList && (<Container fluid>
            <Jumbotron className="bg-dark-t text-light m-5 p-4">
              <h4 className="p-2">
                ToDo
            </h4>
              <TaskSubmit onSubmit={this.addNewTask} />
              <hr />
              <h5>Upcoming</h5>
              <hr />
              <TaskList onClick={this.updateTaskStatus} tasks={this.state.notStarted} setList={this.setList} type="notStarted" />
              <h5>In progress</h5>
              <hr />
              <TaskList onClick={this.updateTaskStatus} tasks={this.state.inProgress} setList={this.setList} type="inProgress" />
              <h5>Complete</h5>
              <hr />
              <TaskList onClick={this.updateTaskStatus} tasks={this.state.complete} setList={this.setList} type="complete" />
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={this.save}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </Button>
                <Button variant="secondary" onClick={this.download}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0H4zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                  </svg>
                </Button>
              </ButtonGroup>
            </Jumbotron>
          </Container>)
        }
        {
          this.state.showReport && (<Report report={this.state.report} />)
        }
      </>
    );
  }
}

const Login = props => {
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(username)
  }

  return (
    <div className="jumbotron text-light position-absolute login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter your Longwood ID</Form.Label>
          <Form.Control onChange={handleInputChange} value={username} placeholder="Longwood ID" />
          <Form.Text className="text-muted">
            This will be used to associate your work with yourself
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default App;
