const { Todo } = require('../models');
class TodoController {
  static async create(req, res, next) {
    try {
      const todo = await Todo.create({
        creator: req.loggedin.id,
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDatee
      });
      res.status(201).json({
        message: 'todo created',
        data: todo,
      });
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async read(req, res, next) {
    try {
      const data = await Todo.find({ creator: req.loggedin.id })
      res.status(200).json(data)
    } catch (next) {}
  }
}

module.exports = TodoController;
