import { Request, Response } from "express";
import { IProductService } from "@/domain/ports/in/product-service.port";

export class ProductController {
  constructor(private readonly productService: IProductService) { }

  private validateBody(body: any): boolean {
    if (
      typeof body.name !== "string" ||
      typeof body.price !== "number" ||
      typeof body.stock !== "number" ||
      typeof body.state !== "string" ||
      typeof body.categoryId !== "number"
    ){
      return false;
    }
    return true;
  }

  create = async (req: Request, res: Response) => {
    this.validateBody(req.body);
    try {
      const created = await this.productService.create(req.body);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    res.json(await this.productService.getAll());
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await this.productService.update(id, req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.productService.delete(id);
      res.status(204).send();
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };
}