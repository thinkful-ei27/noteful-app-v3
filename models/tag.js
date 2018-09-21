'use strict';

const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }
});

// Add `createdAt` and `updatedAt` fields
tagSchema.set('timestamps', true);

// Customize output for `res.json(data)`, `console.log(data)` etc.
tagSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Tag', tagSchema);
