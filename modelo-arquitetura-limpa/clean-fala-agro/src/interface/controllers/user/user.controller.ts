import {Request,Response} from 'express'
import { CreateUserUseCase } from "../../../domain/use-cases/user/createUser.useCase";
import { GetAllUserUseCase } from "../../../domain/use-cases/user/getAllUser.useCase";

type userControllerInput = {

    createUserUseCase: CreateUserUseCase
    getAllUserUseCase: GetAllUserUseCase

}

export class UserController {

    constructor(private input:userControllerInput ) {}

    async getAllUser(request: Request, response: Response){
        const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
        try {
            const user = await this.input.getAllUserUseCase.execute();
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ error: "Erro no controlador" });
        }
    }

    async createUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
        const user = await this.input.createUserUseCase.execute({ name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt });
        try {
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ error: user });
        }
    }

}

