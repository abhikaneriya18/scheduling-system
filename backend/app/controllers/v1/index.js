const express = require('express')
const router = express.Router()

const authRoutes = require('./login/routes')
const availabilityRoutes = require('./availability/routes')
const bookingLinkRoutes = require('./bookingLink/routes')

router.use('/auth', authRoutes)
router.use('/availability', availabilityRoutes)
router.use('/booking', bookingLinkRoutes)

module.exports = router
