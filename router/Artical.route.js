const express = require('express');
const router = express.Router();
const { articalModel } = require('../models/Artical.model');

// Create a new article
router.post('/articles', async (req, res) => {
    try {
        const { title, chapter_Number, duration } = req.body;
        const newArticle = new articalModel({
            title,
            chapter_Number,
            duration,
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await articalModel.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific article by ID
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await articalModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an article by ID
router.patch('/articles/:id', async (req, res) => {
    try {
        const { title, chapter_Number, duration } = req.body;
        const updatedArticle = await articalModel.findByIdAndUpdate(
            req.params.id,
            { title, chapter_Number, duration },
            { new: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an article by ID
router.delete('/articles/:id', async (req, res) => {
    try {
        const deletedArticle = await articalModel.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
