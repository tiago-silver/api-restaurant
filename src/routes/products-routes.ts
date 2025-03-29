import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productController = new ProductController()

const productsRoutes = Router()

productsRoutes.get("/", productController.index)
productsRoutes.post("/", productController.create)

export {productsRoutes}