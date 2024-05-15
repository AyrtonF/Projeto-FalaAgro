import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface"


export class deleteUserUseCase {
    constructor(private userRepository:UserRepositoryInterface){}
    async execute(userId:string):Promise<deleteUserOutput>{
        const existingUser  = await this.userRepository.findById(userId)
        if(!existingUser ){
            throw new Error("usuario não existe")
        }

       const verification:boolean = await this.userRepository.delete(userId)
       if(!verification){
        throw new Error("Erro interno durante a exclusão do user")
       }

       return {message:"Usuario deletado com sucesso"}
    }
}



type deleteUserOutput = {
    message:string
}

