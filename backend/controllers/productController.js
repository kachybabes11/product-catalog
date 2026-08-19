import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch(error){
        console.log("Error fetching products", error)
    }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product Id does not exist" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error fetching product", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.imageURL) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error creating product", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProduct = async (req, res) => {
  const product = req.body;
  const {id} = req.params  

  if (!mongoose.isValidObjectId(id)) {
   return res
      .status(404)
      .json({ success: false, message: "Product Id does not exist" });
  }

  if (!product.name || !product.price || !product.imageURL) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error editing product", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.isValidObjectId(id)){
     return res.status(404).json({success: false, message: "Product Id does not exist"})
    }
 
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error deleting product", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
