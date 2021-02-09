var express = require("express");
var mysql = require("mysql");
var dbconfig = require("../configuration/dbconfig");
var router = express.Router();

var { v4: uuidv4 } = require("uuid");

var connection = mysql.createConnection({
  host: dbconfig.settings.host,
  port: dbconfig.settings.port,
  database: dbconfig.settings.database,
  user: dbconfig.settings.user,
  password: dbconfig.settings.password,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

router.get("/tasks/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM tasks WHERE list_id = '" + req.params.id + "'",
    function (error, data, fields) {
      if (error) throw error;
      res.json(data);
    }
  );
});

router.get("/subtasks/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM subtasks WHERE task_id = '" + req.params.id + "'",
    function (error, data, fields) {
      if (error) throw error;
      res.json(data);
    }
  );
});

router.get("/lists/:user", function (req, res, next) {
  connection.query(
    "SELECT * FROM lists WHERE user = '" + req.params.user + "'",
    function (error, data, fields) {
      if (error) throw error;
      res.json(data);
    }
  );
});

// POST requests

router.post("/delete/", function (req, res, next) {
  connection.query("DELETE FROM tasks WHERE id = '" + req.body.id + "'");
  res.end();
});

router.post("/deleteSubtask/", function (req, res, next) {
  connection.query("DELETE FROM subtasks WHERE id = '" + req.body.id + "'");
  res.end();
});

router.post("/status/", function (req, res, next) {
  connection.query(
    "UPDATE tasks SET status='" +
      req.body.status +
      "' WHERE id='" +
      req.body.id +
      "'"
  );
  res.end();
});

router.post("/saveSubtask/", function (req, res, next) {
  const uuid = uuidv4();
  connection.query(
    "INSERT INTO subtasks (task_id, description, id) VALUES ('" +
      req.body.task_id +
      "','" +
      req.body.subtask +
      "', '" +
      uuid +
      "')"
  );
  res.json({ id: uuid });
});

router.post("/saveTask/", function (req, res, next) {
  const uuid = uuidv4();
  connection.query(
    "INSERT INTO tasks (id, status, description, list_id) VALUES ('" +
      uuid +
      "', 'NS', '" +
      req.body.task +
      "','" +
      req.body.list +
      "')",
    function (err, result, fields) {
      if (err) throw err;
    }
  );

  res.json({ id: uuid });
});

router.post("/list/create/", function (req, res, next) {
  const uuid = uuidv4();
  connection.query(
    "INSERT INTO lists (id, name, user) VALUES ('" +
      uuid +
      "','" +
      req.body.name +
      "', '" +
      req.body.user +
      "')"
  );
  res.json({ id: uuid });
});

router.post("/login/", function (req, res, next) {
  "SELECT id FROM users WHERE password = '" +
    req.body.password +
    "' AND id = '" +
    req.body.user +
    "';",
    console.log(
      "SELECT id FROM users WHERE password = '" +
        req.body.password +
        "' AND id = '" +
        req.body.user +
        "';"
    );
  connection.query(
    "SELECT id FROM users WHERE password = '" +
      req.body.password +
      "' AND id = '" +
      req.body.user +
      "'",
    function (err, result, fields) {
      if (err) throw err;
      if (result.length) {
        res.json({ id: result[0].id });
      } else {
        res.json({ id: "" });
      }
    }
  );
});

module.exports = router;
