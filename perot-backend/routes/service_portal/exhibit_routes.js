const express = require("express");
const app = express.Router();

const exhibitRepo = require("../../repos/service_portal/exhibits_repo");

/**
 * Documentation available at: https://documenter.getpostman.com/view/12165658/T1DqfGH6?version=latest
 */

app.post("/exb/create", (req, res) => {
  exhibitRepo
    .create(
      req.body.title,
      req.body.description,
      req.body.name,
      req.body.featured,
      req.body.location,
      req.body.ages,
      req.body.focus,
      req.body.status,
      req.body.image,
      [],
      req.body.flowIndex,
      new Date(),
      new Date()
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-all", (req, res) => {
  exhibitRepo
    .getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-featured", (req, res) => {
  exhibitRepo
    .getFeatured()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-others", (req, res) => {
  exhibitRepo
    .getOthers()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});
app.get("/exb/get-exhibit", (req, res) => {
  exhibitRepo
    .getExhibit(req.query.name)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-trivia", (req, res) => {
  exhibitRepo
    .getTrivia(req.query.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-sh", (req, res) => {
  exhibitRepo
    .getSh(req.query.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-subs", (req, res) => {
  exhibitRepo
    .getSubExhibits(req.query.exhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/exb/get-recommended", (req, res) => {
  exhibitRepo
    .getRecommendedFlow()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.delete("/exb/delete", (req, res) => {
  exhibitRepo
    .delete(req.query.name)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update", (req, res) => {
  exhibitRepo
    .update(
      req.body.title,
      req.body.description,
      req.body.name,
      req.body.featured,
      req.body.location,
      req.body.ages,
      req.body.focus,
      req.body.status,
      req.body.image,
      req.body.flowIndex,
      new Date()
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update-title", (req, res) => {
  exhibitRepo
    .updateTitle(req.body.name, req.body.title)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update-description", (req, res) => {
  exhibitRepo
    .updateDescription(req.body.name, req.body.description)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update-featured", (req, res) => {
  exhibitRepo
    .updateFeatured(req.body.name, req.body.featured)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/add-sub", (req, res) => {
  exhibitRepo
    .addSubExhibit(
      req.body.exhibitName,
      req.body.subExhibitName,
      req.body.title,
      req.body.description
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update-sub", (req, res) => {
  exhibitRepo
    .updateSubExhibit(
      req.body.exhibitName,
      req.body.subExhibitName,
      req.body.title,
      req.body.description
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/update-flow", (req, res) => {
  exhibitRepo
    .updateFlow(req.body.name, req.body.flowIndex)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/exb/delete-sub", (req, res) => {
  exhibitRepo
    .deleteSubExhibit(req.body.exhibitName, req.body.subExhibitName)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

module.exports = app;
