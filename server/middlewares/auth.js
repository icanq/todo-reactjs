const { User, Todo } = require('../models');
const { verifyToken } = require('../helpers/tokenHandler');
module.exports = {
  async authentication(req, res, next) {
    try {
      const { access_token } = req.headers;
      if (access_token) {
        const decoded = verifyToken(access_token);
        const findUser = await User.findById(decoded.id);
        if (findUser) {
          req.loggedin = decoded;
          next();
        } else {
          throw {
            status: 401,
            message: "Please do Login"
          }
        }
    } else {
      throw {
        status: 401,
        message: "Please do Login"
      }
    }
    } catch (error) {
      next(error)
    }
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
