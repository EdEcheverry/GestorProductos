const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
  try {
    const createProduct = new Product(req.body);
    await createProduct.save();
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error could not create product: ', error: error.message });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
  }
}

exports.findProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        const product = await Product.findOne({ name: { $regex: new RegExp(name, 'i') } });
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error updating product: ', error: error.message });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error deleting product: ', error: error.message });
  }
}


exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error updating product: ', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Product deleted sucefully' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error deleting product: ', error: error.message });
    }
};