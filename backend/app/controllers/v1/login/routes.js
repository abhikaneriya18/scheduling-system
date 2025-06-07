const router = require('express').Router()
const service = require('./service')

router.post('/login', service.login)
router.post('/register', service.register)

router.all('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    messages: 'Not Found'
  });
})

module.exports = router
