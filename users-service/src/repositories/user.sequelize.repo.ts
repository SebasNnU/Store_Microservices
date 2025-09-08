import { User } from "@/models/user.model";
import { UserSequelize } from "@/models/user.sequelize.model";

export class UserRepository {

  async create(user: Omit<User, "id">): Promise<User> {
    return await UserSequelize.create(user);
  }

  async getAll(): Promise<User[]> {
    return await UserSequelize.findAll();
  }

  async getById(id: number): Promise<User|null> {
    return await UserSequelize.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await UserSequelize.destroy({ where: { id } });
    return deleted > 0;
  }

  async validate(name: string, password: string): Promise<boolean>  {
    const user = await UserSequelize.findOne({ where: { name, password } });
    return !!user;
  }

};