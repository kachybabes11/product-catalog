import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", editProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
