import { Request, Response } from "express";
import { CreateAccessUseCase } from "../../domain/useCases/access/createAccess.useCase";
import { InternalServerError } from "../../errors/errors";
import { handleErrors } from "../../errors/hadler.errors";
import { GetAllAccessUseCase } from "../../domain/useCases/access/getAllAccess.useCase";
import { UpdateNameAccessUseCase } from "../../domain/useCases/access/updateNameAccess.useCase";


type AccessControllerInput = {
    createAccessUseCase: CreateAccessUseCase
    getAllAccessUseCase: GetAllAccessUseCase
    updateNameAccessUseCase: UpdateNameAccessUseCase
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
        }catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async getAllAccess(request: Request, response: Response): Promise<Response> {
        try {
            const access = await this.input.getAllAccessUseCase.execute();
            return response.status(201).json(access);
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async updateNameAccess(request: Request, response: Response): Promise<Response> {
        const { newName } = request.body;
        const { id } = request.params;
        try {
            const updatedAccess = await this.input.updateNameAccessUseCase.execute({
                id ,
                newName 
            });

            return response.status(201).json(updatedAccess);
        }catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
}
