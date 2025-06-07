// const config = require('../../../config')
const { BookingLinkModel, BookingModel } = require('../../../models');
const Availability = require('../../../models/lib/Availability');

class Service {
  async generateLink(req, res) {
    try {
      let linkDoc = await BookingLinkModel.findOne({ iUserId: req.iUserId });
      if (!linkDoc) {
        const sLinkId = Math.random().toString(36).substring(2, 10);
        linkDoc = await BookingLinkModel.create({ iUserId: req.iUserId, sLinkId });
      }
      res.json({ sLinkId: linkDoc.sLinkId });
    } catch (err) {
      res.status(500).json({ message: 'Error generating link', err });
    }
  }
  async getLinkDataById(req, res) {
    try {
      const { id } = req.params;
      console.log('sLinkId getLinkDataById', id)
      const linkDoc = await BookingLinkModel.findOne({ sLinkId: id });
      if (!linkDoc) return res.status(404).json({ message: 'Invalid booking link' });

      const availability = await Availability.find({ iUserId: linkDoc.iUserId });
      const bookings = await BookingModel.find({ sLinkId: id });

      res.json({ availability, bookings });
    } catch (err) {
      res.status(500).json({ message: 'Server error', err });
    }
  }
  async bookSloteById(req, res) {
    try {
      const { id: sLinkId } = req.params;
      const { dDate, dTimeSlot } = req.body;
      console.log(req.body)
      console.log(sLinkId)
      const linkDoc = await BookingLinkModel.findOne({ sLinkId });
      if (!linkDoc) return res.status(404).json({ message: 'Invalid booking link' });

      const existing = await BookingModel.findOne({ sLinkId, dDate, dTimeSlot });
      if (existing) return res.status(400).json({ message: 'Slot already booked' });

      await BookingModel.create({ sLinkId, dDate, dTimeSlot });
      res.json({ message: 'Booking confirmed' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', err });
    }
  }
}

module.exports = new Service()