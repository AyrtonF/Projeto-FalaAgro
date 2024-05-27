import { Request, Response } from 'express'
import { CreateUserUseCase } from "../../domain/useCases/user/createUser.useCase";
import { GetAllUserUseCase } from "../../domain/useCases/user/getAllUser.useCase";
import { SignInUseCase } from '../../domain/useCases/user/signIn.useCase';
import { DeleteAllUsersUseCase } from '../../domain/useCases/user/deleteAllUsers.useCase';
import { handleErrors } from '../../errors/hadler.errors';
import { GetUserByIdUseCase } from '../../domain/useCases/user/getUserById.useCase';
import { InternalServerError, InvalidFieldTypeError } from '../../errors/errors';
import { UpdateUserUseCase } from '../../domain/useCases/user/updateUser.useCase';
import { AddAccessToUserUseCase } from '../../domain/useCases/user/addAccessToUser.useCase';
import { RemoveAccessToUserUseCase } from '../../domain/useCases/user/removeAccessToUser.useCase';
import { DeleteUserUseCase } from '../../domain/useCases/user/deleteUser.useCase';
import { toUpperCaseStrings } from '../../../functions/toUpperCase';

type userControllerInput = {
    deleteAllUsersUseCase: DeleteAllUsersUseCase;
    createUserUseCase: CreateUserUseCase
    getAllUserUseCase: GetAllUserUseCase
    getUserByIdUseCase:GetUserByIdUseCase
    signInUseCase: SignInUseCase
    updateUserUseCase: UpdateUserUseCase
    deleteUserUseCase: DeleteUserUseCase
    addAccessToUserUseCase : AddAccessToUserUseCase
    removeAccessToUserUseCase: RemoveAccessToUserUseCase
}

export class UserController {

    constructor(private input: userControllerInput) { }
    
    async createUser(request: Request, response: Response): Promise<Response> {

        try {
            let { name, email, password, cpf, cnpj, cep, numberAddress, AccessName} = request.body;
           
           
            
        if(typeof numberAddress == 'string' ){
          if(isNaN(parseInt(numberAddress)))  throw new InvalidFieldTypeError("Tipo inválido para o campo: NumberAddress ")
            numberAddress = parseInt(numberAddress)
        }
        
        let propsUpperCase = {name, email, password, cpf, cnpj, cep, numberAddress, AccessName}
            const user = await this.input.createUserUseCase.execute(propsUpperCase);
            return response.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async getUserById(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        
        if (!id || typeof id !== 'string') {
            return response.status(400).json({ error: 'ID inválido' });
        }

        try {
            const user = await this.input.getUserByIdUseCase.execute(id);
            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async signInUseCase(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        try {
            const token = await this.input.signInUseCase.execute({ email, password });
            return response.status(200).json(token); // Use 200 para sucesso
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }

    async updateUser(request:Request, response:Response):Promise<Response>{
        const {name, email, password, cpf, cnpj, cep, numberAddress} = request.body
        
        const {id} = request.user
        try {
            const updatedUser = await this.input.updateUserUseCase.execute({id,name, email, password, cpf, cnpj, cep, numberAddress})
            return response.status(200).json(updatedUser)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async addAccessToUser(request:Request, response:Response):Promise<Response>{
        const {newAccessName} = request.body
        const {id} = request.user
        try {
            const updatedUser = await this.input.addAccessToUserUseCase.execute({id,newAccessName})
            return response.status(200).json(updatedUser)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async removeAccessToUser(request:Request, response:Response):Promise<Response>{
        const {accessName} = request.body
        const {id} = request.user
        try {
            const updatedUser = await this.input.removeAccessToUserUseCase.execute({id,accessName})
            return response.status(200).json(updatedUser)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async getAllUser(request:Request, response:Response):Promise<Response>{

        
        try {
            const user = await this.input.getAllUserUseCase.execute();
            return response.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async deleteUser(request: Request, response: Response) {
        try {
            const {id} = request.user
            const message = await this.input.deleteUserUseCase.execute(id);
            return response.status(201).json(message);
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
    }
}

    async deleteAll(request: Request, response: Response){
        await this.input.deleteAllUsersUseCase.execute()
        return response.json({message:"Tudo deletado"})
    }

}

