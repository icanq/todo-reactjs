const { Todo } = require('../models');
class TodoController {
  static async create(req, res, next) {
    try {
      const todo = await Todo.create({
        creator: req.loggedin.id,
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDatee,
      });
      res.status(201).json({
        message: 'todo created',
        data: todo,
      });
    } catch (err) {
      next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const data = await Todo.find({ creator: req.loggedin.id });
      res.status(200).json(data);
    } catch (next) {}
  }

  static async findById(req, res, next) {
    Todo.findById(req.params.id)
      .populate({ path: 'creator', select: 'username email -_id' })
      .then((todo) => {
        res.status(200).json({
          data: {
            _id: todo._id,
            name: todo.name,
            creator: todo.creator,
            group: todo.group,
            description: todo.description,
            dueDate: todo.dueDate,
            updatedAt: todo.updatedAt,
            status: todo.status,
          },
        });
      })
      .catch(next);
  }

  static async update(req, res, next) {
    Todo.findById(req.params.id)
      .then((todo) => {
        todo.name = req.body.name || todo.name;
        todo.description = req.body.description || todo.description;
        todo.dueDate = req.body.dueDate
          ? new Date(req.body.dueDate).setHours(23, 59, 59)
          : todo.dueDate;
        if (new Date(req.body.dueDate).setHours(23, 59, 59) < new Date()) {
          if (todo.status != 'done') todo.status = 'missed';
        } else if (todo.status == 'missed') todo.status = 'ongoing';

        return todo.save();
      })
      .then((todo) => {
        todo.populate({ path: 'creator', select: 'username email -_id' });
        res.status(200).json({
          message: 'Todo updated',
          data: {
            _id: todo._id,
            name: todo.name,
            creator: todo.creator,
            group: todo.group,
            description: todo.description,
            dueDate: todo.dueDate,
            updatedAt: todo.updatedAt,
            status: todo.status,
          },
        });
      })
      .catch(next);
  }

  static async delete(req, res, next) {
    Todo.findByIdAndDelete(req.params.id)
      .then((_) => {
        res.status(201).json({ message: 'deleted' });
      })
      .catch(next);
  }
}

module.exports = TodoController;
