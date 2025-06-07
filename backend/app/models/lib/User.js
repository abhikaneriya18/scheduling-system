const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     sEmail: { type: String, unique: true },
     sPassword: String,
});

module.exports = mongoose.model('User', userSchema);

//s for string