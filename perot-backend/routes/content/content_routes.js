const express = require("express");
const app = express.Router();

const shLeaderBoardRepo = require("../../repos/leader_boards/sh_leader_boards_repo");
const triviaLeaderBoardRepo = require("../../repos/leader_boards/trivia_leader_boards_repo");
const shRepo = require("../../repos/scavenger_hunts/scavenger_hunts_repo");
const triviaRepo = require("../../repos/trivia/trivia_repo");

/**
 * Documentation available at: https://documenter.getpostman.com/view/12165658/T1DqfGH6?version=latest
 */

/**
 * Scavenger Hunt leader board endpoints
 */

app.post("/leader-board/sh/create", (req, res) => {
  shLeaderBoardRepo
    .create(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/leader-board/sh/get-all", (req, res) => {
  shLeaderBoardRepo
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/leader-board/sh/get", (req, res) => {
  shLeaderBoardRepo
    .get(req.query.username)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/leader-board/sh/update", (req, res) => {
  shLeaderBoardRepo
    .update(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.delete("/leader-board/sh/delete", (req, res) => {
  shLeaderBoardRepo
    .delete(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * Trivia leader board endpoints
 */

app.post("/leader-board/trivia/create", (req, res) => {
  triviaLeaderBoardRepo
    .create(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/leader-board/trivia/get-all", (req, res) => {
  triviaLeaderBoardRepo
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/leader-board/trivia/get", (req, res) => {
  triviaLeaderBoardRepo
    .get(req.query.username)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/leader-board/trivia/update", (req, res) => {
  triviaLeaderBoardRepo
    .update(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.delete("/leader-board/trivia/delete", (req, res) => {
  triviaLeaderBoardRepo
    .delete(req.body.username, req.body.score)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 *  Trivia endpoints
 */

app.post("/trivia/create", (req, res) => {
  triviaRepo
    .create(
      req.body.tId,
      req.body.exhibitName,
      req.body.subExhibitTitle,
      req.body.subExhibitName,
      req.body.question,
      req.body.responses,
      req.body.correct,
      req.body.status
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/trivia/get-all", (req, res) => {
  triviaRepo
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/trivia/get", (req, res) => {
  triviaRepo
    .get(req.query.tId)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/trivia/get-status", (req, res) => {
  triviaRepo
    .getStatus(req.query.status)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/trivia/get-for-sub", (req, res) => {
  triviaRepo
    .getForSubExhibit(req.query.subExhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/trivia/get-for-exb", (req, res) => {
  triviaRepo
    .getForExhibit(req.query.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/trivia/update", (req, res) => {
  triviaRepo
    .update(
      req.body.tId,
      req.body.exhibitName,
      req.body.subExhibitTitle,
      req.body.subExhibitName,
      req.body.question,
      req.body.responses,
      req.body.correct,
      req.body.status
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/trivia/update-status", (req, res) => {
  triviaRepo
    .updateStatus(req.body.tId, req.body.status)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

/**
 * Scavenger Hunt endpoints
 */

app.post("/sh/create", (req, res) => {
  shRepo
    .create(req.body.shId, null, req.body.exhibitName, req.body.status)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/sh/get-all", (req, res) => {
  shRepo
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/sh/get", (req, res) => {
  shRepo
    .get(req.query.shId)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/sh/get-status", (req, res) => {
  shRepo
    .getStatus(req.query.status)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/sh/get-for-sub", (req, res) => {
  shRepo
    .getForExhibit(req.query.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/sh/update", (req, res) => {
  shRepo
    .update(req.body.shId, req.body.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/sh/update-status", (req, res) => {
  shRepo
    .updateStatus(req.body.shId, req.body.status)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/sh/add-item", (req, res) => {
  shRepo
    .addItem(
      req.body.shId,
      req.body.name,
      req.body.connection,
      req.body.location,
      req.body.question,
      req.body.hints,
      req.body.answer
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/sh/update-item", (req, res) => {
  shRepo
    .updateItem(
      req.body.shId,
      req.body.name,
      req.body.connection,
      req.body.location,
      req.body.question,
      req.body.hints,
      req.body.answer
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.delete("/sh/delete", (req, res) => {
  shRepo
    .delete(req.query.shId)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/sh/delete-item", (req, res) => {
  shRepo
    .deleteItem(req.body.shId, req.body.name)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});
module.exports = app;
