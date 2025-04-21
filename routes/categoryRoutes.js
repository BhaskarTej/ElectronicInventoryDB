const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Get all categories
router.get('/', getAllCategories);

// Get category by ID
router.get('/:id', getCategoryById);

// Add a new category
router.post('/', addCategory);

// Update a category
router.put('/:id', updateCategory);

// Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;