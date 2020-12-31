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
router.use('todos/:id', authorization)
router.get('/todos/:id', todo.findById)
router.put('/todos/:id', todo.update)
router.delete('/todos/:id', todo.delete)

module.exports = router