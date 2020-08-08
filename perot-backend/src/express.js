const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("../config/config");

const servicePortalRoutes = require("../routes/service_portal/service_portal");
const exhibitRoutes = require("../routes/service_portal/exhibit_routes");
const contentRoutes = require("../routes/content/content_routes");
const userRoutes = require("../routes/users/users_routes");
/**
 * Express Class file.
 */
class Express {
  /**
   * Constructor sets initializes express, middlewares and routes
   */
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    console.log(
      "Backend running at: http://" + config.IP + ":" + config.APP_PORT
    );
    console.log("MongoDB URL: " + config.DB);
  }

  /**
   * Middlewares used to configure express server with other libraries and custom options
   */
  middlewares() {
    this.server.use(cors({ origin: "*" }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(express.static(path.join(__dirname, "public")));

    // Mongoose connection
    mongoose.connect(config.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.server.listen(config.APP_PORT);
  }

  /**
   * Initialize API access point routes for different modules
   */
  routes() {
    this.server.use("/sp", servicePortalRoutes);
    this.server.use("/sp", exhibitRoutes);
    this.server.use("/api/", contentRoutes);
    this.server.use("/users", userRoutes);
  }
}

module.exports = new Express().server;
