import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: 0,
    tag: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setProducts([]);
    }
  };

  const fetchProductsByName = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/findProductByName?name=${name}`);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([response.data]);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchProductsByName(searchTerm);
    } else {
      fetchAllProducts();
    }
  }, [searchTerm]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: '', stock: 0, tag: '' });
    } catch (error) {
      console.error('Error al agregar producto:', error.response ? error.response.data : error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, editProduct);
      const updatedProducts = products.map(product =>
        product._id === editProduct._id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditProduct(null);
    } catch (error) {
      console.error('Error al editar producto:', error.response ? error.response.data : error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error al eliminar producto:', error.response ? error.response.data : error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct({ ...editProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{editProduct ? 'Editar Producto' : 'Añadir Producto'}</h1>
        <form onSubmit={(e) => { e.preventDefault(); editProduct ? handleEditProduct() : handleAddProduct(); }}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                placeholder="Nombre" 
                name="name" 
                value={editProduct ? editProduct.name : newProduct.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input 
                type="text" 
                placeholder="Descripción" 
                name="description" 
                value={editProduct ? editProduct.description : newProduct.description} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input 
                type="number" 
                placeholder="Precio" 
                name="price" 
                value={editProduct ? editProduct.price : newProduct.price} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input 
                type="number" 
                placeholder="Stock" 
                name="stock" 
                value={editProduct ? editProduct.stock : newProduct.stock} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Etiqueta (tag)</label>
              <input 
                type="text" 
                placeholder="Etiqueta (tag)" 
                name="tag" 
                value={editProduct ? editProduct.tag : newProduct.tag} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            {editProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
        </form>
      </div>
      <div className="right-container">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <h2>Lista de Productos</h2>
        <div className="product-table-container">
          {products.length > 0 ? (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Etiqueta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.tag}</td>
                    <td>
                      <button onClick={() => setEditProduct(product)}>Editar</button>
                      <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;