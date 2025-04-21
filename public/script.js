// API URLs
const productApiUrl = 'http://localhost:3000/api/products';
const categoryApiUrl = 'http://localhost:3000/api/categories';
const supplierApiUrl = 'http://localhost:3000/api/suppliers';

/* ===========================
   PRODUCT MANAGEMENT
=========================== */

// Fetch Products
async function fetchProducts() {
  const response = await fetch(productApiUrl);
  const products = await response.json();
  displayProducts(products);
}

// Display Products
function displayProducts(products) {
  const tableBody = document.querySelector('#product-table tbody');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.product_id}</td>
      <td>${product.name}</td>
      <td>${product.category_id}</td>
      <td>${product.quantity}</td>
      <td>${product.price}</td>
      <td>${product.supplier_id}</td>
      <td>${product.reorder_level}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="showEditProductForm(${product.product_id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.product_id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add Product
document.getElementById('product-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const productData = {
    name: document.getElementById('name').value,
    category_id: parseInt(document.getElementById('category_id').value),
    quantity: parseInt(document.getElementById('quantity').value),
    price: parseFloat(document.getElementById('price').value),
    supplier_id: parseInt(document.getElementById('supplier_id').value),
    reorder_level: parseInt(document.getElementById('reorder_level').value),
  };

  const response = await fetch(productApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    alert('Product added successfully!');
    fetchProducts();
  } else {
    alert('Error adding product');
  }
});

// Show Edit Form for Products
async function showEditProductForm(productId) {
  const response = await fetch(`${productApiUrl}/${productId}`);
  const product = await response.json();
  
  document.getElementById('edit_product_id').value = product.product_id;
  document.getElementById('edit_name').value = product.name;
  document.getElementById('edit_category_id').value = product.category_id;
  document.getElementById('edit_quantity').value = product.quantity;
  document.getElementById('edit_price').value = product.price;
  document.getElementById('edit_supplier_id').value = product.supplier_id;
  document.getElementById('edit_reorder_level').value = product.reorder_level;
  document.getElementById('edit-product-form').style.display = 'block';
}

// Update Product
document.getElementById('edit-product-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('edit_product_id').value;
  const productData = {
    name: document.getElementById('edit_name').value,
    category_id: parseInt(document.getElementById('edit_category_id').value),
    quantity: parseInt(document.getElementById('edit_quantity').value),
    price: parseFloat(document.getElementById('edit_price').value),
    supplier_id: parseInt(document.getElementById('edit_supplier_id').value),
    reorder_level: parseInt(document.getElementById('edit_reorder_level').value),
  };

  const response = await fetch(`${productApiUrl}/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    alert('Product updated successfully!');
    fetchProducts();
    document.getElementById('edit-product-form').style.display = 'none';
  } else {
    alert('Error updating product');
  }
});

// Delete Product
async function deleteProduct(id) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;

  const response = await fetch(`${productApiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Product deleted successfully!');
    fetchProducts();
  } else {
    alert('Error deleting product');
  }
}

/* ===========================
   CATEGORY MANAGEMENT
=========================== */

// Fetch Categories
async function fetchCategories() {
  const response = await fetch(categoryApiUrl);
  const categories = await response.json();
  const tableBody = document.querySelector('#category-table tbody');
  tableBody.innerHTML = '';

  categories.forEach(category => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category.category_id}</td>
      <td>${category.category_name}</td>
      <td>
        <button onclick="deleteCategory(${category.category_id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add Category
document.getElementById('category-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const categoryData = {
    category_name: document.getElementById('category_name').value,
  };

  const response = await fetch(categoryApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (response.ok) {
    alert('Category added successfully!');
    fetchCategories();
  } else {
    alert('Error adding category');
  }
});

// Delete Category
async function deleteCategory(id) {
  const confirmDelete = confirm('Are you sure you want to delete this category?');
  if (!confirmDelete) return;

  const response = await fetch(`${categoryApiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Category deleted successfully!');
    fetchCategories();
  } else {
    alert('Error deleting category');
  }
}

/* ===========================
   SUPPLIER MANAGEMENT
=========================== */

// Fetch Suppliers
async function fetchSuppliers() {
  const response = await fetch(supplierApiUrl);
  const suppliers = await response.json();
  const tableBody = document.querySelector('#supplier-table tbody');
  tableBody.innerHTML = '';

  suppliers.forEach(supplier => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${supplier.supplier_id}</td>
      <td>${supplier.supplier_name}</td>
      <td>${supplier.contact_email}</td>
      <td>${supplier.contact_phone}</td>
      <td>${supplier.address}</td>
      <td>
        <button onclick="deleteSupplier(${supplier.supplier_id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete Supplier
async function deleteSupplier(id) {
  const confirmDelete = confirm('Are you sure you want to delete this supplier?');
  if (!confirmDelete) return;

  const response = await fetch(`${supplierApiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('Supplier deleted successfully!');
    fetchSuppliers();
  } else {
    alert('Error deleting supplier');
  }
}

// Initial Fetches
if (document.getElementById('product-table')) {
  fetchProducts();
}
if (document.getElementById('category-table')) {
  fetchCategories();
}
if (document.getElementById('supplier-table')) {
  fetchSuppliers();
}