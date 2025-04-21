const db = require('../utils/dbConfig');

// Get all categories
const getAll = async () => {
  const [categories] = await db.query('SELECT * FROM Categories');
  return categories;
};

// Get category by ID
const getById = async (id) => {
  const [category] = await db.query('SELECT * FROM Categories WHERE category_id = ?', [id]);
  return category[0];
};

// Add a new category
const add = async (category) => {
  const { category_name } = category;
  const [result] = await db.query('INSERT INTO Categories (category_name) VALUES (?)', [category_name]);
  return result.insertId;
};

// Update category
const update = async (id, category) => {
  const { category_name } = category;
  await db.query('UPDATE Categories SET category_name=? WHERE category_id=?', [category_name, id]);
};

// Delete category
const remove = async (id) => {
  await db.query('DELETE FROM Categories WHERE category_id=?', [id]);
};

module.exports = { getAll, getById, add, update, remove };