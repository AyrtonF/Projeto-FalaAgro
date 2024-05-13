import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import { User } from "../../models/user.model"



export class GetUserByIdUseCase {
    constructor(private userRepository:UserRepositoryInferface){}
    async execute (userId:string):Promise<GetUserByIdOutput>{
        const user = await this.userRepository.findById(userId)
        if(!user){
            throw new Error("Usuario não encontrado")
        }
        return user.toJSON()
    }
}


type GetUserByIdOutput = {
    
        id?: string;
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