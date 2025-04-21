const db = require('../utils/dbConfig');

// Get all products
const getAll = async () => {
  const [products] = await db.query('SELECT * FROM Products');
  return products;
};

// Get product by ID
const getById = async (id) => {
  const [product] = await db.query('SELECT * FROM Products WHERE product_id = ?', [id]);
  return product[0];
};

// Add a new product
const add = async (product) => {
  const { name, category_id, quantity, price, supplier_id, reorder_level } = product;
  const [result] = await db.query(
    'INSERT INTO Products (name, category_id, quantity, price, supplier_id, reorder_level) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category_id, quantity, price, supplier_id, reorder_level]
  );
  return result.insertId;
};

// Update product
const update = async (id, product) => {
  const { name, category_id, quantity, price, supplier_id, reorder_level } = product;
  await db.query(
    'UPDATE Products SET name=?, category_id=?, quantity=?, price=?, supplier_id=?, reorder_level=? WHERE product_id=?',
    [name, category_id, quantity, price, supplier_id, reorder_level, id]
  );
};

// Delete product
const remove = async (id) => {
  await db.query('DELETE FROM Products WHERE product_id=?', [id]);
};

module.exports = { getAll, getById, add, update, remove };