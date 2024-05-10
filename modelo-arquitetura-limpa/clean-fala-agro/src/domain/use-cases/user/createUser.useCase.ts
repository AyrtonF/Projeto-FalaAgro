import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import { User } from "../../models/user.model"

export class CreateUserUseCase {
    constructor(private userRepository:UserRepositoryInferface){}

    async execute(input:CreateUserInput):Promise<CreateUserOutput>{
        const userInput = new User(input)
        const user = await this.userRepository.insert(userInput)
        return user.toJSON()
    }
}


type CreateUserInput ={
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt:Date
    updatedAt:Date
}

type CreateUserOutput ={
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt:Date
    updatedAt:Date
}