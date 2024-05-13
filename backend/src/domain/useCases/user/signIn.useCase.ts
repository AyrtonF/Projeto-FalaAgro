import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"


import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class SignInUseCase {
    constructor(private userRepository:UserRepositoryInferface){}
    async execute(input:SignInInput):Promise<SignInOutput>{
        const doesUserExist = await this.userRepository.doesUserExist(input.email)
        if(!doesUserExist){
            throw new Error("email não existe")
        }
        const passwordPrisma = await this.userRepository.getPasswordByEmail(input.email)

        const isPasswordValid = await compare(input.password, passwordPrisma);

        if (!isPasswordValid) {
            throw new Error("Senha incorreta") 
          }
      
          const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
          if (!MY_SECRET_KEY) {
            throw new Error("Chave secreta não fornecida");
          }

          const payload = await this.userRepository.getRolesUserByEmail(input.email)

          const token = sign(
            {
             payload
            },
            MY_SECRET_KEY,
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
        return {token}
    }
}


type SignInInput = {
    email:string,
    password:string
}

type SignInOutput = {
    token:string
}
    
