import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"

export class GetAllUserUseCase {
    constructor(private userRepository:UserRepositoryInferface){}

    async execute():Promise<GetUserUseCaseOutput>{
        
        const users = await this.userRepository.findAll()
        return users.map(item => item.toJSON())
    }
}




type GetUserUseCaseOutput ={
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
}[]