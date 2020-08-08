const Announcement = require("../../models/service_portal/announcements");
const FAQ = require("../../models/service_portal/faq");

class AnnouncementAndFaqRepo {
  constructor(model) {
    this.model = model;
  }

  createAnnouncement(id, title, description, date, image, status) {
    const newAnnouncement = { id, title, description, date, image, status };

    const announcement = new this.model(newAnnouncement);

    return announcement.save();
  }

  createFaq(id, question, answer) {
    const newFaq = { id, question, answer };
    const faq = new FAQ(newFaq);
    return faq.save();
  }

  updateAnnouncement(id, title, description, image, status) {
    return this.model.updateOne(
      { id: id },
      {
        title: title,
        description: description,
        image: image,
        status: status,
      }
    );
  }

  updateStatusAnnouncement(id, status) {
    return this.model.updateOne(
      {
        id: id,
      },
      {
        status: status,
      }
    );
  }

  updateFaq(id, question, answer) {
    return FAQ.updateOne(
      { id: id },
      {
        question: question,
        answer: answer,
      }
    );
  }

  getAnnouncements() {
    return this.model.find();
  }

  getAnnouncement(id) {
    return this.model.findOne({ id: id });
  }

  getActiveAnnouncements() {
    return this.model.find({ status: true });
  }

  getFaqs() {
    return FAQ.find();
  }
  getFAQ(id) {
    return FAQ.findOne({ id: id });
  }

  deleteAnnouncement(id) {
    return this.model.deleteOne({ id: id });
  }

  deleteFaq(id) {
    return FAQ.deleteOne({ id: id });
  }
}

module.exports = new AnnouncementAndFaqRepo(Announcement);
