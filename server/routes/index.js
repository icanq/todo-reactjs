const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('from router')
})

module.exports = router