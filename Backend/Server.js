// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://akaur966:<password>@cluster0.bmsw2po.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Models - Ticket Model
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  resolution: { type: String },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// CRUD Routes
app.post('/tickets', async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/tickets/:id', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/tickets/:id', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    res.json(deletedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
