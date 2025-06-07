const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
     sLinkId: String,
     dDate: String,
     dTimeSlot: String,
});

module.exports = mongoose.model('Booking', bookingSchema);

//d for date
//s for string