import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import { User } from "../../models/user.model"

export class CreateUserUseCase {
    constructor(private userRepository:UserRepositoryInferface){}

    async execute(input:CreateUserInput):Promise<CreateUserOutput| any>{
        const userInput = new User(input)
        const emailUnique = await this.userRepository.isUniqueEmail(userInput.email)
        if(emailUnique){
            const user = await this.userRepository.insert(userInput)
            return user.toJSON()
        }else{
           return {message:"Email já existente"}
        }
            
        
        
    }
}


type CreateUserInput = {
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt?:Date
    updatedAt?:Date
}

type CreateUserOutput = {
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt?:Date
    updatedAt?:Date
}