const bcryptjs = require('bcryptjs')

module.exports = {
  hash(pwd) {
    return bcryptjs.hashSync(pwd, 10)
  },
  compare(pwd, hashPwd) {
    return bcryptjs.compareSync(pwd, hashPwd)
  }
}