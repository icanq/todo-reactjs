const { User, Todo } = require('../models');
const { verifyToken } = require('../helpers/tokenHandler');
module.exports = {
  async authentication(req, res, next) {
    try {
      const payload = verifyToken(req.headers.access_token);
      const user = await User.findById(payload.id);
      if (!user) {
        throw {
          status: 404,
          message: 'Account not found',
        };
      } else {
        req.loggedin = user;
      }
    } catch (next) {}
  },
  async authorization(req, res, next) {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        throw {
          status: 404,
          message: 'Not found',
        };
      } else if (todo.creator == req.loggedin.id) {
        next();
      } else {
        throw {
          status: 403,
          message: 'Unauthorized',
        };
      }
    } catch (next) {}
  },
};
