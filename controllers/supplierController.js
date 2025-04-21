const db = require('../utils/dbConfig');
const supplierModel = require('../models/supplierModel');

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.getAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierModel.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a supplier
const addSupplier = async (req, res) => {
  try {
    const supplierId = await supplierModel.add(req.body);
    res.status(201).json({ message: 'Supplier added successfully', supplierId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a supplier
const updateSupplier = async (req, res) => {
  try {
    await supplierModel.update(req.params.id, req.body);
    res.json({ message: 'Supplier updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
  try {
    await supplierModel.remove(req.params.id);
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSupplierPerformance = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        s.supplier_id,
        s.supplier_name AS supplier_name,
        COUNT(o.order_id) AS total_orders,
        SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders,
        ROUND(AVG(CASE 
          WHEN o.delivery_date IS NOT NULL THEN DATEDIFF(o.delivery_date, o.order_date)
          ELSE NULL END), 2) AS avg_delivery_days
      FROM Suppliers s
      LEFT JOIN Orders o ON s.supplier_id = o.supplier_id
      GROUP BY s.supplier_id, s.supplier_name
    `);

    res.json(results);
  } catch (err) {
    console.error("Supplier Performance Error:", err);
    res.status(500).json({ error: "Failed to retrieve supplier performance data." });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierPerformance 
};