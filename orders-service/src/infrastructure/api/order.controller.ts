import { Request, Response } from 'express';
import { IOrderService } from '@/domain/ports/in/order-service.port';

export class OrderController {
    constructor(private readonly orderService: IOrderService) { }

    private validateBody(body: any): boolean {
        if (
            typeof body.userId !== 'number' ||
            typeof body.total !== 'number'
        ){
            return false;
        }
        return true;
    }

    create = async (req: Request, res: Response) => {
        this.validateBody(req.body);
        try {
            const created = await this.orderService.create(req.body);
            res.status(201).json(created);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const orders = await this.orderService.getAll();
            res.json(orders);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const order = await this.orderService.getById(id);
            res.json(order);
        } catch (e: any) {
            res.status(404).json({ error: e.message });
        }
    };

    getByUserId = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const orders = await this.orderService.getByUserId(userId);
            res.json(orders);
        } catch (e: any) {
            res.status(404).json({ error: e.message });
        }
    };

    getDetailsById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const orderDetail = await this.orderService.getDetailsById(id);
            res.json(orderDetail);
        } catch (e: any) {
            res.status(404).json({ error: e.message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.orderService.delete(id);
            res.status(204).send();
        } catch (e: any) {
            res.status(404).json({ error: e.message });
        }
    };
}