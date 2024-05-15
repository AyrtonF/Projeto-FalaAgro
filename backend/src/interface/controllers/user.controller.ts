import { Request, Response } from 'express'
import { CreateUserUseCase } from "../../domain/useCases/user/createUser.useCase";
import { GetAllUserUseCase } from "../../domain/useCases/user/getAllUser.useCase";
import { SignInUseCase } from '../../domain/useCases/user/signIn.useCase';
import { DeleteAllUsersUseCase } from '../../domain/useCases/user/deleteAllUsers.useCase';
import { handleErrors } from '../../errors/hadler.errors';
import { GetUserByIdUseCase } from '../../domain/useCases/user/getUserById.useCase';
type userControllerInput = {
    deleteAllUsersUseCase: DeleteAllUsersUseCase;
    createUserUseCase: CreateUserUseCase
    getAllUserUseCase: GetAllUserUseCase
    getUserByIdUseCase:GetUserByIdUseCase
    signInUseCase: SignInUseCase

}

export class UserController {

    constructor(private input: userControllerInput) { }
    
    async createUser(request: Request, response: Response): Promise<Response> {

        try {
            const { name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt } = request.body;
            const user = await this.input.createUserUseCase.execute({ name, email, password, cpf, cnpj, cep, numberAddress, AccessName, createdAt, updatedAt });
            return response.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
               const errorResponse = handleErrors(error)
               
               return response.status(errorResponse.status).json(errorResponse.message)
            }else{
                return response.status(500).json({message:"Erro interno no servidor"}) 
            }
        }
    }
    async getUserById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        
        if (!id || typeof id !== 'string') {
            return response.status(400).json({ error: 'ID inválido' });
        }

        try {
            const user = await this.input.getUserByIdUseCase.execute(id);
            return response.status(200).json(user);
        } catch (error) {
            if(error instanceof Error){
              const errorResponse = handleErrors(error);
              return response.status(errorResponse.status).json({ error: errorResponse.message });
            }else{
                return response.status(500).json({message:"Erro interno no servidor"}) 
            }
        }
    }
    async signInUseCase(request: Request, response: Response) {
        const { email, password } = request.body;
        try {
            const token = await this.input.signInUseCase.execute({ email, password });
            return response.status(200).json(token); // Use 200 para sucesso
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
                return response.status(500).json({ error: 'Internal Server Error' }); 
            }
        }
    }
    
    async getAllUser(request: Request, response: Response) {
        
        try {
            const user = await this.input.getAllUserUseCase.execute();
            return response.status(201).json(user);
        } catch (error) {
            console.error(error.message)
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteAll(request: Request, response: Response){
        await this.input.deleteAllUsersUseCase.execute()
        return response.json({message:"Tudo deletado"})
    }

}

