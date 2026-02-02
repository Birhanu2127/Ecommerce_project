import express from 'express';
import { Contact } from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

export default router;
