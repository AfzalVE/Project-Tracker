import express from 'express';
const router = express.Router();
import Task from '../models/Task.js';
import Section from '../models/Section.js';

// GET /api/tasks/:sectionId
router.get('/:sectionId', async (req, res) => {
  try {
    const tasks = await Task.find({ sectionId: req.params.sectionId }).sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all tasks (useful for global search/analytics)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, priority, notes, assignee, sectionId } = req.body;
    
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const count = await Task.countDocuments({ sectionId });
    
    const task = new Task({
      title: title || 'New Task',
      priority: priority || 'Medium',
      assignee: assignee || '',
      notes: notes || '',
      sectionId,
      order: count,
    });
    
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.priority = req.body.priority || task.priority;
      task.assignee = req.body.assignee !== undefined ? req.body.assignee : task.assignee;
      task.notes = req.body.notes !== undefined ? req.body.notes : task.notes;
      task.sectionId = req.body.sectionId || task.sectionId;
      
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/tasks/toggle/:id
router.put('/toggle/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.completed = !task.completed;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/tasks/reorder
router.put('/reorder', async (req, res) => {
  try {
    const { tasks } = req.body; // array of { _id, order, sectionId } (sectionId in case it was moved between sections)
    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    
    const promises = tasks.map((t) =>
      Task.findByIdAndUpdate(t._id, { order: t.order, sectionId: t.sectionId })
    );
    await Promise.all(promises);
    res.json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
