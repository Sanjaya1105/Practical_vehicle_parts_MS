const express = require('express');
const router = express.Router();
const partController = require('../controllers/part.controller');

// Create a new part
router.post('/', partController.create);

// Get all parts
router.get('/', partController.findAll);

// Get a single part with id
router.get('/:id', partController.findOne);

// Update a part
router.put('/:id', partController.update);

// Delete a part
router.delete('/:id', partController.delete);

module.exports = router; 