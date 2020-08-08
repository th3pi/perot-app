var ip = require("ip");

var ipAddress = ip.address();
module.exports = {
  IP: process.env.ipAddress ? process.env.ipAddress : ipAddress,
  DB: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : "mongodb://" + ipAddress + ":27017/perot",
  APP_PORT: 8181,
};
