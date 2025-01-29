import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, selectedProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        tag: '',
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={product.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={product.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Precio"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="tag"
                placeholder="Tag"
                value={product.tag}
                onChange={handleChange}
                required
            />
            <button type="submit">
                {selectedProduct ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    );
};

export default ProductForm;