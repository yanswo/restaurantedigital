import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string,
    role: "ADMIN" | "CLIENT"
  ) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email já em uso.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = generateToken(user.id, user.role);
    return { user: { id: user.id, name: user.name, role: user.role }, token };
  }
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Email ou senha inválidos.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Senha inválida.");

    const token = generateToken(user.id, user.role);

    return { user: { id: user.id, name: user.name, role: user.role }, token };
  }
}
