import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"
import { AccessRepositoryInferface } from "../../../data/repositories/access.repository.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


export class SignInUseCase {
    constructor(private userRepository:UserRepositoryInferface, private accessRepository:AccessRepositoryInferface){}
    async execute(input:SignInInput):Promise<SignInOutput>{
        const doesUserExist = await this.userRepository.doesUserExist(input.email)
        if(!doesUserExist){
            throw new Error('Usuario não encontrado')
        }
        const password = await this.userRepository.getPasswordByEmail(input.email)
        const isPasswordValid = await compare(input.password, password);
        if (!isPasswordValid) {
            throw new Error("Senha incorreta") 
          }

          const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
          if (!MY_SECRET_KEY) {
            throw new Error("Chave secreta não fornecida");
          }

          const userIdRoles = await this.userRepository.getUserRolesByEmail(input.email)


          const token = sign(
            {userId: userIdRoles.userId,
            roles: userIdRoles.roles},
            MY_SECRET_KEY,
            {
              algorithm: "HS256",
              expiresIn: "2h",
            }
          )
          //[userId, roles]
         /*  const token = sign(
            {
              userId: user.id,
              roles: user.UserAccess.map((ua) => ua.Access?.name || ''), // Mapeie os nomes dos acessos do usuário
            },
            MY_SECRET_KEY,
            {
              algorithm: "HS256",
              expiresIn: "2h",
            }
          ); */
        //verificar se o usuario existe
        // verificar se a senha está errada
        // verificar se a chave secreta foi fornecida
        // gerar o token com {userId:string, roles}
        return {token:token}

    }
}


type SignInInput = {
    email:string,
    password:string
}

type SignInOutput = {
    token:string
}
    
