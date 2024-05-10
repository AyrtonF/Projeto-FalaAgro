import { Request, Response } from "express";
import { CreateAccessUseCase } from "../../../domain/use-cases/access/createAccess.useCase";

export class CreateAccessController {
    constructor(private createAccessUseCase: CreateAccessUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, createdAt, updatedAt } = request.body;

        try {
            const access = await this.createAccessUseCase.execute({
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
