const router = require('express').Router()
const {user} = require('../controllers')

router.get('/', (req, res) => {
  res.send('from router')
})
router.post('/register', user.register)
router.post('/login', user.login)

module.exports = router