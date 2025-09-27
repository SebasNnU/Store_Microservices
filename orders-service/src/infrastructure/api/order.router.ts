import { Router } from 'express';
import { OrderController } from './order.controller';
import { OrderService } from '@/application/services/order.service';
import { OrderRepository } from '@/infrastructure/persistence/order.sequelize.repo';

const router = Router();

// Inyección de dependencias
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.post('/orders', orderController.create);
router.get('/getAllOrders', orderController.getAll);
router.get('/getOrderById/:id', orderController.getById);
router.get('/getOrder/:userId', orderController.getByUserId);
router.get('/getDetailOrderById/:id', orderController.getDetailsById);
router.delete('/deleteOrder/:id', orderController.delete);

export default router;