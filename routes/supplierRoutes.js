const express = require('express');
const router = express.Router();
const {
  getAllSuppliers,
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierPerformance // ✅ Added this!
} = require('../controllers/supplierController');

// Get all suppliers
router.get('/', getAllSuppliers);

// Get supplier by ID
router.get('/:id', getSupplierById);

// Add a new supplier
router.post('/', addSupplier);

// Update a supplier
router.put('/:id', updateSupplier);

// Delete a supplier
router.delete('/:id', deleteSupplier);

// ✅ Supplier Performance route
router.get('/performance/all', getSupplierPerformance);

module.exports = router;