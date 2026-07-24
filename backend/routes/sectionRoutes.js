import express from 'express';
const router = express.Router();
import Section from '../models/Section.js';
import Task from '../models/Task.js';

// GET /api/sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find({}).sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sections
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const count = await Section.countDocuments();
    const section = new Section({
      title: title || 'New Section',
      order: count,
    });
    const createdSection = await section.save();
    res.status(201).json(createdSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/sections/:id
router.put('/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (section) {
      section.title = req.body.title || section.title;
      section.collapsed = req.body.collapsed !== undefined ? req.body.collapsed : section.collapsed;
      const updatedSection = await section.save();
      res.json(updatedSection);
    } else {
      res.status(404).json({ message: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/sections/:id
router.delete('/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (section) {
      await Task.deleteMany({ sectionId: section._id }); // Delete all tasks in the section
      await section.deleteOne();
      res.json({ message: 'Section removed' });
    } else {
      res.status(404).json({ message: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/sections/reorder
router.put('/reorder', async (req, res) => {
  try {
    const { sections } = req.body; // array of { _id, order }
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    const promises = sections.map((sec) =>
      Section.findByIdAndUpdate(sec._id, { order: sec.order })
    );
    await Promise.all(promises);
    res.json({ message: 'Sections reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
