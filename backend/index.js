require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());
require('./app/models/db').connect()
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// ===== Routes =====
app.use('/api', require('./app/controllers'))
// Register
// app.post('/api/register', async (req, res) => {
//      try {
//           const { sEmail, sPassword } = req.body;
//           const hashed = await bcrypt.hash(sPassword, 10);
//           const user = new User({ sEmail, sPassword: hashed });
//           await user.save();
//           res.json({ message: 'User registered' });
//      } catch (err) {
//           res.status(400).json({ message: 'Error registering user', err });
//      }
// });

// // Login
// app.post('/api/login', async (req, res) => {
//      try {
//           const { sEmail, sPassword } = req.body;
//           console.log('req.body :- ', req.body)
//           const user = await User.findOne({ sEmail });
//           if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//           const match = await bcrypt.compare(sPassword, user.sPassword);
//           if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//           const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '12h' });
//           res.json({ token });
//      } catch {
//           res.status(500).json({ message: 'Server error' });
//      }
// });

// Save availability
// app.post('/api/save-availability', authMiddleware, async (req, res) => {
//      try {
//           const { dDate, dStartTime, dEndTime } = req.body;
//           if (!dDate || !dStartTime || !dEndTime) return res.status(400).json({ message: 'Missing fields' });

//           const existing = await Availability.findOne({ iUserId: req.iUserId, dDate, dStartTime, dEndTime });
//           if (existing) {
//                return res.status(400).json({ message: 'Availability already exists' });
//           }

//           await Availability.create({ iUserId: req.iUserId, dDate, dStartTime, dEndTime });
//           res.json({ message: 'Availability saved' });
//      } catch (err) {
//           res.status(500).json({ message: 'Error saving availability', err });
//      }
// });
// // Get user's availability
// app.get('/api/availability', authMiddleware, async (req, res) => {
//      const availability = await Availability.find({ iUserId: req.iUserId });
//      res.json({ availability });
// });
// // Generate booking link
// app.post('/api/generate-link', authMiddleware, async (req, res) => {
//      try {
//           let linkDoc = await BookingLink.findOne({ iUserId: req.iUserId });
//           if (!linkDoc) {
//                const sLinkId = Math.random().toString(36).substring(2, 10);
//                linkDoc = await BookingLink.create({ iUserId: req.iUserId, sLinkId });
//           }
//           res.json({ sLinkId: linkDoc.sLinkId });
//      } catch (err) {
//           res.status(500).json({ message: 'Error generating link', err });
//      }
// });
// // Public: Get availability and bookings by sLinkId
// app.get('/api/availability/:sLinkId', async (req, res) => {
//      try {
//           const { sLinkId } = req.params;
//           const linkDoc = await BookingLink.findOne({ sLinkId });
//           if (!linkDoc) return res.status(404).json({ message: 'Invalid booking link' });

//           const availability = await Availability.find({ iUserId: linkDoc.iUserId });
//           const bookings = await Booking.find({ sLinkId });

//           res.json({ availability, bookings });
//      } catch (err) {
//           res.status(500).json({ message: 'Server error', err });
//      }
// });
// // Book a slot (public)
// app.post('/api/book/:sLinkId', async (req, res) => {
//      try {
//           const { sLinkId } = req.params;
//           const { dDate, dTimeSlot } = req.body;

//           const linkDoc = await BookingLink.findOne({ sLinkId });
//           if (!linkDoc) return res.status(404).json({ message: 'Invalid booking link' });

//           const existing = await Booking.findOne({ sLinkId, dDate, dTimeSlot });
//           if (existing) return res.status(400).json({ message: 'Slot already booked' });

//           await Booking.create({ sLinkId, dDate, dTimeSlot });
//           res.json({ message: 'Booking confirmed' });
//      } catch (err) {
//           res.status(500).json({ message: 'Server error', err });
//      }
// });
// Catch-all for 404
app.use((req, res) => {
     res.status(404).json({ message: 'Endpoint not found' });
});
// Start server
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
