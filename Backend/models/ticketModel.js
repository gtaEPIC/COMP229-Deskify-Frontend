// backend/models/ticketModel.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  resolution: { type: String },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
