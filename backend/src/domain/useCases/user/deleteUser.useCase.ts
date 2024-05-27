import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface"
import { UserNotFoundError } from "../../../errors/errors"

export class DeleteUserUseCase {
    constructor(private userRepository:UserRepositoryInterface){}
    async execute(userId:string):Promise<DeleteUserOutput>{
        
        const doesUserExist  = await this.userRepository.doesUserExist({id:userId})
        if(!doesUserExist ){
            throw new UserNotFoundError()
        }

       await this.userRepository.delete(userId)
       

       return {message:"Usuario deletado com sucesso"}
    }
}



type DeleteUserOutput = {
    message:string
}

