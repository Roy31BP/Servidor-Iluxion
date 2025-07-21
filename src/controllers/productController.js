const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // quitado "provider"
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un solo producto por ID
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category"); // quitado "provider"
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener productos aleatorios por ID
const obtenerProductsAleatoriosPorId = async (req, res) => {
  console.log("✅ ENTRÓ A /aleatorios");
  try {
    const count = await Product.countDocuments();
    const sampleSize = count < 3 ? count : 3;
    const products = await Product.aggregate([{ $sample: { size: sampleSize } }]);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos aleatorios:", error);
    res.status(500).json({ message: "Error al obtener productos aleatorios" });
  }
};

// Crear un producto
const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "El precio debe ser un número válido" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Categoría no válida" });
    }

    const newProduct = new Product({
      name,
      price: parsedPrice,
      category: new mongoose.Types.ObjectId(category),
      image
    });

    await newProduct.save();
    res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    console.error("Error en createProduct:", error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name && !price && !image) {
      return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (image) updateData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  obtenerProductsAleatoriosPorId,
};
