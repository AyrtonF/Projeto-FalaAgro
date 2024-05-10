import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import  { DuplicateEmailError,AccessNameDoesNotExist, UserError }  from "../../../errors/user.error"
import { AccessRepositoryInferface } from "../../../data/repositories/access.repository.interface";
import { User } from "../../models/user.model"

export class CreateUserUseCase {
    constructor(private userRepository:UserRepositoryInferface, private accessRepository:AccessRepositoryInferface){}

    async execute(input:CreateUserInput):Promise<CreateUserOutput>{
        const userInput = new User(input)
        const emailUnique = await this.userRepository.isUniqueEmail(userInput.email)
        const accessNameExists  = await this.accessRepository.doesAccessExist(userInput.AccessName)
        if (!emailUnique) {
            throw new DuplicateEmailError()
        }
        if(!accessNameExists){
            throw new AccessNameDoesNotExist()
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