const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

router.get('/proxy', async (req, res) => {
    try {
        const response = await geminiService();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error proxying Gemini API' });
    }
});

module.exports = router;