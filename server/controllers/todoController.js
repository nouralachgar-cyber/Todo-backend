const Todo = require('../models/Todo');

// @desc Get todos for authenticated user
// @route GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    console.error('GetTodos error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

// @desc Create todo
// @route POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      user: req.user._id,
      completed: false,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      todo,
    });
  } catch (error) {
    console.error('CreateTodo error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

// @desc Update todo
// @route PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Ensure user owns the todo
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    // Validate title if provided
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Task title cannot be empty',
        });
      }
      todo.title = title.trim();
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    const updatedTodo = await todo.save();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    console.error('UpdateTodo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

// @desc Delete todo
// @route DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await todo.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('DeleteTodo error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
