const router = require('express').Router()
const service = require('./service')
const { authMiddleware } = require('../../../middlewares/middleware')

router.post('/save', authMiddleware, service.save)
router.get('/:id', service.getAllAvailability)

router.all('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    messages: 'Not Found'
  });
})

module.exports = router
