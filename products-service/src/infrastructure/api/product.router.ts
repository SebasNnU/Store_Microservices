import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductService } from "@/application/services/product.service";
import { ProductRepository } from "@/infrastructure/persistence/product.sequelize.repo";

const router = Router();

// Inyección de dependencias
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post("/createProduct", productController.create);
router.get("/getAllProducts", productController.getAll);
router.put("/updateProduct/:id", productController.update);
router.delete("/deleteProduct/:id", productController.delete);

export default router;