import { User } from "@/models/user.model";

let users: User[] = [
  { id: 1, name: "Juan",  lastName: "Pérez", password: "1234" },
  { id: 2, name: "María", lastName: "Gómez", password: "abcd" },
];
let currentUserId = 3;

export class UserRepository {
  
  async create(user: Omit<User, "id">): Promise<User> {
    const newUser: User = { id: currentUserId++, ...user };
    users.push(newUser);
    return newUser;
  }

  async getAll(): Promise<User[]> {
    return users;
  }

  async getById(id: number): Promise<User|undefined> {
    return users.find(u => u.id === id);
  }

  async delete(id: number): Promise<boolean> {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }

  async validate(name: string, password: string): Promise<boolean> {
    return users.some(u => u.name === name && u.password === password);
  }

};
