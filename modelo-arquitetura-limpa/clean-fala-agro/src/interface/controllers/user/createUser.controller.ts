import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../domain/use-cases/user/createUser.useCase";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
        try {
            const user = await this.createUserUseCase.execute({ name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt });
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ error: "Erro no controlador" });
        }
    }
}
