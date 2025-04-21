const db = require('../utils/dbConfig');

// API-based reorder
const checkAndReorderProducts = async (req, res) => {
  try {
    const [lowStockProducts] = await db.query(`
      SELECT product_id, name, supplier_id, quantity, reorder_level
      FROM Products
      WHERE quantity <= reorder_level
    `);

    if (lowStockProducts.length === 0) {
      return res.json({ message: 'No products need reordering.' });
    }

    for (const product of lowStockProducts) {
      await db.query(`
        INSERT INTO Orders (supplier_id, order_date, status)
        VALUES (?, NOW(), 'pending')
      `, [product.supplier_id]);
    }

    res.json({ message: `Reordered ${lowStockProducts.length} product(s).` });
  } catch (error) {
    console.error('Error in reorder:', error);
    res.status(500).json({ error: 'Failed to reorder products.' });
  }
};

module.exports = { checkAndReorderProducts };