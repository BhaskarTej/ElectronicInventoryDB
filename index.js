require('dotenv').config();
const express = require('express');
const db = require('./utils/dbConfig');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const reorderRoutes = require('./routes/reorderRoutes');
const path = require('path');
const cron = require('node-cron');
const { checkAndReorderProducts } = require('./controllers/reorderController');

const app = express();
app.use(express.json());

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api', forecastRoutes);
app.use('/api', reorderRoutes);

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Schedule to run every day at 12 AM (automated reorder check)
cron.schedule('0 0 * * *', () => {
  console.log('Running automated reorder check...');
  checkAndReorderProducts();
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve forecast.html
app.get('/forecast', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forecast.html'));
});

// Health Check API
app.get('/health', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
