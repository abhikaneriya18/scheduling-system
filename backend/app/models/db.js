const mongoose = require('mongoose')
const config = require('../../config')
class DB {
  static connect() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected')).catch(console.error);

  }
}

module.exports = DB
