import { Request, Response } from "express";
import { GetAllUserUseCase } from "../../../domain/use-cases/user/getAllUser.useCase";

export class GetAllUserController {
    constructor(private getAllUserUseCase: GetAllUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
        try {
            const user = await this.getAllUserUseCase.execute();
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ error: "Erro no controlador" });
        }
    }
}
