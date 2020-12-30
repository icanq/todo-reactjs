const { User } = require('../models');
const { compare } = require('../helpers/passwordHandler');
const { signToken } = require('../helpers/tokenHandler');
class UserController {
  static async register(req, res, next) {
    try {
      const data = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(data)
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (next) {}
  }
  static async login(req, res, next) {
    try {
      const data = await User.findOne({
        email: req.body.email,
      });
      console.log(data)
      if (compare(req.body.password, data.password)) {
        const access_token = signToken(data);
        res.status(200).json({
          access_token: access_token,
        });
      } else {
        throw {
          status: 404,
          message: 'Account not found',
        };
      }
    } catch (next) {}
  }
}

module.exports = UserController;