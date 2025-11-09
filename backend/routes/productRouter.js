import express from "express";
import { createProduct, deleteProduct, getProductId, getProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter =  express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/search/:query", searchProducts)
productRouter.get("/:productId", getProductId);
;

export default productRouter;
