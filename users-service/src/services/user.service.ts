import { UserRepository } from "@/repositories/user.sequelize.repo";
import { CreateUserDto } from "@/models/dtos/user.dto";
import { ValidateUserDto } from "@/models/dtos/validate-user.dto";
import { User } from "@/models/user.model";

export class UserService {
  private userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();
  }

  private validateBusinessRules(data: { name?: string; lastName?: string; password?: string }) {
    if (!data.name?.trim()) throw new Error("Nombre requerido");
    if (!data.lastName?.trim()) throw new Error("Apellido requerido");
    if (!data.password?.trim()) throw new Error("Password requerido");
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.validateBusinessRules(dto);
    return await this.userRepository.create(dto);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error(`Usuario con id ${id} no encontrado`);
    return user;
  }

  async validate(dto: ValidateUserDto): Promise<boolean> {
    if (!dto.name?.trim() || !dto.password?.trim())
      throw new Error("Credenciales incompletas");
    return await this.userRepository.validate(dto.name, dto.password);
  }

  async delete(id: number): Promise<void> {
    const ok = await this.userRepository.delete(id);
    if (!ok) throw new Error(`Usuario con id ${id} no encontrado`);
  }
  
};
