const express = require('express');
const router = express.Router();
const { tweetModel } = require('../models/Tweet.model');

// Create a new tweet
router.post('/tweets', async (req, res) => {
    try {
        const newTweet = new tweetModel(req.body);
        await newTweet.save();
        res.status(201).json(newTweet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tweets
router.get('/tweets', async (req, res) => {
    try {
        const tweets = await tweetModel.find();
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific tweet by ID
router.get('/tweets/:id', async (req, res) => {
    try {
        const tweet = await tweetModel.findById(req.params.id);
        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a tweet by ID
router.delete('/tweets/:id', async (req, res) => {
    try {
        const deletedTweet = await tweetModel.findByIdAndDelete(req.params.id);
        if (!deletedTweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.status(204).json({msg:"Tweet deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
