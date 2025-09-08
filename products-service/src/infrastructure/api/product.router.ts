import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductService } from "@/application/services/product.service";
import { ProductRepository } from "@/infrastructure/persistence/product.sequelize.repo";

const router = Router();

// Inyección de dependencias
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post("/", productController.create);
router.get("/", productController.getAll);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;