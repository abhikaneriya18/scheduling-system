require('dotenv').config()
const Config = function () {
  this.DB_URL = process.env.DB_URL
  this.JWT_SECRET = process.env.JWT_SECRET;
}
module.exports = new Config()
