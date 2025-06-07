const mongoose = require('mongoose');

const bookingLinkSchema = new mongoose.Schema({
     iUserId: mongoose.Schema.Types.ObjectId,
     sLinkId: { type: String, unique: true },
});

module.exports = mongoose.model('BookingLink', bookingLinkSchema);

//d for date
//s for string