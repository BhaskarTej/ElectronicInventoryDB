const db = require('../utils/dbConfig');

const getSalesForecast = async (req, res) => {
  const { productId } = req.params;

  try {
    const [salesData] = await db.query(`
      SELECT DATE(sale_date) AS saleDate, SUM(quantity_sold) AS quantity
      FROM Sales
      WHERE product_id = ?
      GROUP BY DATE(sale_date)
      ORDER BY saleDate ASC
      LIMIT 30
    `, [productId]);

    if (salesData.length === 0) {
      return res.json({ history: [], forecast: [], message: 'No sales data found.' });
    }

    const history = salesData.map(row => ({
        date: row.saleDate,
        total: Number(row.quantity) // convert to number!
      }));

    // Debugging logs
    console.log("Sales Data:", salesData);
    console.log("History Totals:", history.map(h => h.total));

    let avgPerDay;
    if (history.length >= 7) {
      const last7 = history.slice(-7);
      const totalLast7 = last7.reduce((sum, row) => sum + row.total, 0);
      avgPerDay = totalLast7 / 7;
    } else {
      const totalSales = history.reduce((sum, row) => sum + row.total, 0);
      avgPerDay = totalSales / history.length;
    }

    const forecast = Array.from({ length: 7 }, (_, i) => ({
      date: `Forecast Day ${i + 1}`,
      total: Math.round(avgPerDay)
    }));

    console.log("Average per day:", avgPerDay);
    console.log("Forecast Values:", forecast);

    res.json({ history, forecast });

  } catch (err) {
    console.error("Forecast Error:", err);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};

module.exports = { getSalesForecast };