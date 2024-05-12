import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import { AccessRepositoryInferface } from "../../../data/repositories/access.repository.interface";
import { User } from "../../models/user.model"


export class SignInUseCase {
    constructor(private userRepository:UserRepositoryInferface, private accessRepository:AccessRepositoryInferface){}
    async execute(input:SignInInput):Promise<SignInOutput>{
        //verificar se o usuario existe
        // verificar se a senha está errada
        // verificar se a chave secreta foi fornecida
        // gerar o token com {userId:string, roles}
        return {token:''}
    }
}


type SignInInput = {
    email:string,
    password:string
}

type SignInOutput = {
    token:string
}
    
