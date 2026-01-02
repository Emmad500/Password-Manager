const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const Password = require('./models/Password');

const app = express();
const port = 3001;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for debugging
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/passem';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Routes
const router = express.Router();

// GET all passwords
router.get('/', async (req, res) => {
    try {
        const passwords = await Password.find();
        res.json(passwords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new password
router.post('/', async (req, res) => {
    const { url, username, password } = req.body;
    const newPassword = new Password({
        url,
        username,
        password
    });

    try {
        const savedPassword = await newPassword.save();
        res.status(201).json(savedPassword);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a password
router.put('/:id', async (req, res) => {
    console.log("PUT Request received for ID:", req.params.id);
    console.log("Request Body:", req.body);
    const { url, username, password } = req.body;
    try {
        const updatedPassword = await Password.findByIdAndUpdate(
            req.params.id,
            { url, username, password },
            { new: true }
        );
        if (!updatedPassword) {
            console.log("Password not found for ID:", req.params.id);
            return res.status(404).json({ message: 'Password not found' });
        }
        console.log("Password updated successfully:", updatedPassword);
        res.json(updatedPassword);
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE a password
router.delete('/:id', async (req, res) => {
    try {
        const deletedPassword = await Password.findByIdAndDelete(req.params.id);
        if (!deletedPassword) return res.status(404).json({ message: 'Password not found' });
        res.json({ message: 'Password deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use('/api', router);
app.use('/', router);

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
