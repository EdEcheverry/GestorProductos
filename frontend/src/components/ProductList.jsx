import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <ul>
            {products.map((product) => (
                <li key={product._id}>
                    <strong>{product.name}</strong> - {product.description} - ${product.price} - Stock: {product.stock} - Tag: {product.tag}
                    <button onClick={() => onEdit(product)}>Editar</button>
                    <button onClick={() => onDelete(product._id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
