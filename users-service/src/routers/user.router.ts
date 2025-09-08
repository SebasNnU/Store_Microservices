import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

const router = Router();

const userController = new UserController();

router.get("/getAll", userController.getAll);
router.get("/getById/:id", userController.getById);
router.post("/createUser", userController.create);
router.post("/validateUser", userController.validate);
router.delete("/deleteUser/:id", userController.delete);

export default router;
