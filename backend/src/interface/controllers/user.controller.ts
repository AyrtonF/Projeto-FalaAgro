import { Request, Response } from 'express'
import { CreateUserUseCase } from "../../domain/useCases/user/createUser.useCase";
import { GetAllUserUseCase } from "../../domain/useCases/user/getAllUser.useCase";
import {  DuplicateEmailError, AccessNameDoesNotExist } from '../../errors/user.error';
import { SignInUseCase } from '../../domain/useCases/user/signIn.useCase';
type userControllerInput = {

    createUserUseCase: CreateUserUseCase
    getAllUserUseCase: GetAllUserUseCase
    signInUseCase: SignInUseCase

}

export class UserController {

    constructor(private input: userControllerInput) { }

    async signInUseCase(request: Request, response: Response) {
        const {email, password } = request.body;
        try {
            const token = await this.input.signInUseCase.execute({email,password});
            return response.status(201).json(token);
        } catch (error) {
            return response.status(400).json({ error: "Erro no controlador" });
        }
    }
    async getAllUser(request: Request, response: Response) {
        
        try {
            const user = await this.input.getAllUserUseCase.execute();
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ error: "Erro no controlador" });
        }
    }
    async createUser(request: Request, response: Response): Promise<Response> {

        try {
            const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
            const user = await this.input.createUserUseCase.execute({ name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt });
            return response.status(201).json(user);
        } catch (error) {
            if (error instanceof DuplicateEmailError) {
                return response.status(error.status).json({ error: error.message });
            }
            else if(error instanceof AccessNameDoesNotExist){
                return response.status(error.status).json({ error: error.message })
            }
            else {
                console.error(error.message)
                return response.status(500).json({ error: error.message });
            }
        }
    }

}

