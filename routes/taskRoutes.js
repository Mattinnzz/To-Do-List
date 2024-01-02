const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middleware/authenticateMiddleware');


router.use(requireAuth);





router.post('/' ,async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTask = await taskController.createTask( title, completed);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskController.getTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await taskController.updateTask(req.params.id, req.body.task);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).send('Task not found.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const toggledTask = await taskController.toggleTaskStatus(req.params.id);
    if (toggledTask) {
      res.json(toggledTask);
    } else {
      res.status(404).send('Task not found.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await taskController.deleteTask(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Task not found.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
