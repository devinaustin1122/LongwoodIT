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

router.get("/categories/:list_id", function (req, res, next) {
  connection.query(
    "SELECT * FROM categories WHERE list_id = '" + req.params.list_id + "'",
    function (err, result, fields) {
      if (err) throw err;
      if (result.length) {
        res.json(result);
      }
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

router.post("/task/save", function (req, res, next) {
  const uuid = uuidv4();
  connection.query(
    "INSERT INTO tasks (id, category_id, description, list_id) VALUES ('" +
      uuid +
      "', '" +
      req.body.category_id +
      "', '" +
      req.body.description +
      "','" +
      req.body.list_id +
      "')",
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.json({ id: uuid });
});

router.post("/list/create/", function (req, res, next) {
  const uuid = uuidv4();
  console.log(
    "INSERT INTO lists (id, name, user, description) VALUES ('" +
      uuid +
      "','" +
      req.body.name +
      "', '" +
      req.body.user +
      "', '" +
      req.body.description +
      "')"
  );
  connection.query(
    "INSERT INTO lists (id, name, user, description) VALUES ('" +
      uuid +
      "','" +
      req.body.name +
      "', '" +
      req.body.user +
      "', '" +
      req.body.description +
      "')"
  );

  for (var i = 0; i < req.body.categories.length; i++) {
    connection.query(
      "INSERT INTO categories(id, list_id, name) VALUES ('" +
        uuidv4() +
        "', '" +
        uuid +
        "', '" +
        req.body.categories[i] +
        "')"
    );
  }

  res.json({ id: uuid });
});

router.post("/list/delete/", function (req, res, next) {
  const uuid = uuidv4();
  connection.query(
    "DELETE FROM lists WHERE id = '" +
      req.body.id +
      "' and user= '" +
      req.body.user +
      "'"
  );
  res.json({ id: uuid });
});

router.post("/login/", function (req, res, next) {
  "SELECT id FROM users WHERE password = '" +
    req.body.password +
    "' AND id = '" +
    req.body.user +
    "';",
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
