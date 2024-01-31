const express = require('express');
const router = express.Router();
const { courseModel } = require('../models/Course.model');

// Create a new tweet
router.post('/course', async (req, res) => {
    try {
        const course = new courseModel(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tweets
router.get('/course', async (req, res) => {
    try {
        const tweets = await courseModel.find();
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific tweet by ID
router.get('/course/:id', async (req, res) => {
    try {
        const tweet = await courseModel.findById(req.params.id);
        if (!tweet) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a tweet by ID
router.delete('/course/:id', async (req, res) => {
    try {
        const deletedTweet = await courseModel.findByIdAndDelete(req.params.id);
        if (!deletedTweet) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(204).json({msg:"Course deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
