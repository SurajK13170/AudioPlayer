const express = require('express');
const router = express.Router();
const { chapterModel } = require('../models/Chapter.model');

// Create a new chapter
router.post('/chapters', async (req, res) => {
    try {
        const { title, chapter_Number, audio, duration } = req.body;
        const newChapter = new chapterModel({
            title,
            chapter_Number,
            audio,
            duration,
        });
        await newChapter.save();
        res.status(201).json(newChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all chapters
router.get('/chapters', async (req, res) => {
    try {
        const chapters = await chapterModel.find();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific chapter by ID
router.get('/chapters/:id', async (req, res) => {
    try {
        const chapter = await chapterModel.findById(req.params.id);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a chapter by ID
router.patch('/chapters/:id', async (req, res) => {
    try {
        const { title, chapter_Number, audio, duration } = req.body;
        const updatedChapter = await chapterModel.findByIdAndUpdate(
            req.params.id,
            { title, chapter_Number, audio, duration },
            { new: true }
        );
        if (!updatedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.status(200).json(updatedChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a chapter by ID
router.delete('/chapters/:id', async (req, res) => {
    try {
        const deletedChapter = await chapterModel.findByIdAndDelete(req.params.id);
        if (!deletedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.status(204).json({message:"Chapter Deleted!"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
