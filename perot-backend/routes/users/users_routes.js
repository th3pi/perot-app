const express = require("express");
const app = express.Router();

const usersRepo = require("../../repos/users/users_repo");

/**
 * API POST Access point to create a new test service portal entry
 */
app.post("/create", (req, res) => {
  usersRepo
    .create(req.body.username, [], req.body.triviaScore, req.body.shScore, [])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/**
 * API GET access point to get all the test service portal entries
 */
app.get("/get-all", (req, res) => {
  usersRepo
    .getAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/add-exhibits-visited", (req, res) => {
  usersRepo
    .addExhibitsVisited(req.body.username, req.body.exhibitName)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/add-trivia-correct", (req, res) => {
  usersRepo
    .addTriviaCorrect(req.body.username, req.body.tId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/add-trivia-incorrect", (req, res) => {
  usersRepo
    .addTriviaIncorrect(req.body.username, req.body.tId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.put("/add-sh-answered", (req, res) => {
  usersRepo
    .addShItemsAnswered(req.body.username, req.body.shItemId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/update", (req, res) => {
  usersRepo
    .update(req.body.username, req.body.triviaScore, req.body.shScore)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/get", (req, res) => {
  usersRepo
    .get(req.query.username)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = app;
