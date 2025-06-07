const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
     iUserId: mongoose.Schema.Types.ObjectId,
     dDate: String,       // YYYY-MM-DD 
     dStartTime: String,  // HH:mm
     dEndTime: String,    // HH:mm
});

module.exports = mongoose.model('Availability', availabilitySchema);

//d for date
//i for id