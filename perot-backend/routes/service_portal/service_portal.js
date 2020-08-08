const express = require("express");
const app = express.Router();

const announcementAndFaqRepo = require("../../repos/service_portal/announcement_and_faq_repo");

app.post("/create-announcement/", (req, res) => {
  announcementAndFaqRepo
    .createAnnouncement(
      req.body.id,
      req.body.title,
      req.body.description,
      new Date(),
      req.body.image,
      req.body.status
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.post("/create-faq/", (req, res) => {
  announcementAndFaqRepo
    .createFaq(req.body.id, req.body.question, req.body.answer)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/update-announcement/", (req, res) => {
  announcementAndFaqRepo
    .updateAnnouncement(
      req.body.id,
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.status
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/update-faq/", (req, res) => {
  announcementAndFaqRepo
    .updateFaq(req.body.id, req.body.question, req.body.answer)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/update-announcement-status/", (req, res) => {
  announcementAndFaqRepo
    .updateStatusAnnouncement(req.body.id, req.body.status)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/get-announcements", (req, res) => {
  announcementAndFaqRepo
    .getAnnouncements()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/get-active-announcements", (req, res) => {
  announcementAndFaqRepo
    .getActiveAnnouncements()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/get-faqs", (req, res) => {
  announcementAndFaqRepo
    .getFaqs()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/get-announcement", (req, res) => {
  announcementAndFaqRepo
    .getAnnouncement(req.query.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/get-faq", (req, res) => {
  announcementAndFaqRepo
    .getFAQ(req.query.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/delete-faq", (req, res) => {
  announcementAndFaqRepo
    .deleteAnnouncement(req.query.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/delete-faq", (req, res) => {
  announcementAndFaqRepo
    .deleteFaq(req.query.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = app;
