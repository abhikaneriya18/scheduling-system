const router = require('express').Router()
const service = require('./service')
const { authMiddleware } = require('../../../middlewares/middleware')

router.post('/generate', authMiddleware, service.generateLink)
router.get('/:id', service.getLinkDataById)
router.post('/book/:id', service.bookSloteById)

router.all('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    messages: 'Not Found'
  });
})

module.exports = router
