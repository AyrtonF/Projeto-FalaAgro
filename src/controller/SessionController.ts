import { compare } from "bcryptjs";
import { prisma } from "./../database/prisma";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        UserAccess: true, // Incluir todos os acessos do usuário
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
    if (!MY_SECRET_KEY) {
      throw new Error("Chave secreta não fornecida");
    }

    const token = sign(
      {
        userId: user.id,
        roles: user.UserAccess.map((ua) => ua.Access?.name || ''), // Mapeie os nomes dos acessos do usuário
      },
      MY_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
