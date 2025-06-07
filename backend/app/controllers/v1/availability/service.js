// const config = require('../../../config')
const { AvailabilityModel } = require('../../../models');

class Service {
  async save(req, res) {
    try {
      const { dDate, dStartTime, dEndTime } = req.body;
      if (!dDate || !dStartTime || !dEndTime) return res.status(400).json({ message: 'Missing fields' });

      const existing = await AvailabilityModel.findOne({ iUserId: req.iUserId, dDate, dStartTime, dEndTime });
      if (existing) {
        return res.status(400).json({ message: 'Availability already exists' });
      }

      await AvailabilityModel.create({ iUserId: req.iUserId, dDate, dStartTime, dEndTime });
      res.json({ message: 'Availability saved' });
    } catch (err) {
      res.status(500).json({ message: 'Error saving availability', err });
    }
  }
  async getAllAvailability(req, res) {
    try {
      console.log('req.iUserId',req.iUserId)
      const availability = await AvailabilityModel.find({ iUserId: req.iUserId });
      res.json({ availability });
    } catch (err) {
      res.status(500).json({ message: 'Error geting availability', err });
    }
  }


}

module.exports = new Service()