const router = require('express').Router()
const { user, todo } = require('../controllers')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.send('from router')
})
router.post('/register', user.register)
router.post('/login', user.login)
router.use(authentication)
router.post('/todos', todo.create)
router.get('/todos', todo.read)

module.exports = router