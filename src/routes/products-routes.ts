import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productController = new ProductController()

const productsRoutes = Router()

productsRoutes.get("/", productController.index)
productsRoutes.post("/", productController.create)
productsRoutes.put("/:id", productController.update)
productsRoutes.delete("/:id", productController.remove)

export {productsRoutes}