import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import  { UserErrors }  from "../../../errors/user.errors"
import { AccessRepositoryInferface } from "../../../data/repositories/access.repository.interface";
import { User } from "../../models/user.model"
import { hash } from "bcryptjs";
export class CreateUserUseCase {
    constructor(private userRepository:UserRepositoryInferface, private accessRepository:AccessRepositoryInferface){}

    async execute(input:CreateUserInput):Promise<CreateUserOutput>{
        
        input.password = await hash( input.password, 8);
        const userInput = new User(input)
        const emailUnique = await this.userRepository.isUniqueEmail(userInput.email)
        const accessNameExists  = await this.accessRepository.doesAccessExist(userInput.AccessName)
        if (!emailUnique) {
            throw UserErrors.duplicateEmailError
        }
        if(!accessNameExists){
            throw UserErrors.accessNameDoesNotExistError
        }
            const user = await this.userRepository.insert(userInput)
            return user.toJSON()
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