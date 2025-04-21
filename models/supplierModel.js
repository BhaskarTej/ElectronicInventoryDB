const db = require('../utils/dbConfig');

// Get all suppliers
const getAll = async () => {
  const [suppliers] = await db.query('SELECT * FROM Suppliers');
  return suppliers;
};

// Get supplier by ID
const getById = async (id) => {
  const [supplier] = await db.query('SELECT * FROM Suppliers WHERE supplier_id = ?', [id]);
  return supplier[0];
};

// Add a new supplier
const add = async (supplier) => {
  const { supplier_name, contact_email, contact_phone, address } = supplier;
  const [result] = await db.query(
    'INSERT INTO Suppliers (supplier_name, contact_email, contact_phone, address) VALUES (?, ?, ?, ?)',
    [supplier_name, contact_email, contact_phone, address]
  );
  return result.insertId;
};

// Update supplier
const update = async (id, supplier) => {
  const { supplier_name, contact_email, contact_phone, address } = supplier;
  await db.query(
    'UPDATE Suppliers SET supplier_name=?, contact_email=?, contact_phone=?, address=? WHERE supplier_id=?',
    [supplier_name, contact_email, contact_phone, address, id]
  );
};

// Delete supplier
const remove = async (id) => {
  await db.query('DELETE FROM Suppliers WHERE supplier_id=?', [id]);
};

module.exports = { getAll, getById, add, update, remove };