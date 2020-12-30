const jwt = require('jsonwebtoken')

module.exports = {
  signToken(user) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET
    )
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}