import { Request, Response } from "express";
import { CreateAccessUseCase } from "../../../domain/use-cases/access/createAccess.useCase";



type AccessControllerInput = {
    createAccessUseCase: CreateAccessUseCase
}
export class AccessController {
    constructor(private input: AccessControllerInput) {}

    async createAccess(request: Request, response: Response): Promise<Response> {
        const { name, createdAt, updatedAt } = request.body;

        try {
            const access = await this.input.createAccessUseCase.execute({
                name,
                createdAt,
                updatedAt
            });

            return response.status(201).json(access);
        } catch (error) {
            return response.status(500).json({ error: "Internal server error" });
        }
    }
}
