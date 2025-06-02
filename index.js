// index.js
const express = require('express');
const { addUser, getUsers, deleteUser, updateUser } = require('./userService');
const { startUserCountLogger } = require('./cron-job');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(require('cors')({
    origin: '*', // Allow all origins for simplicity
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', uptime: process.uptime(), timestamp: Date.now() });
});

app.post('/users', (req, res) => {
    const user = { id: crypto.randomUUID(), ...req.body };
    addUser(user);
    res.status(201).json({ message: 'User added', user });
});

app.get('/users', (req, res) => {
    res.json(getUsers());
});

app.delete('/users/:id', (req, res) => {
    deleteUser(req.params.id);
    res.json({ message: 'User deleted if existed' });
});

app.put('/users/:id', (req, res) => {
    updateUser(req.params.id, req.body);
    const updatedUser = getUsers().find(user => user.id === req.params.id);
    if (updatedUser) {
        res.json({ message: 'User updated', user: updatedUser });

    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    startUserCountLogger(); // Start the cron job
});
