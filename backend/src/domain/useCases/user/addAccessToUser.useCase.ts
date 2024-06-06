import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { AccessAlreadyExistsError, AccessNameDoesNotExist, UserNotFoundError } from "../../../errors/errors";
import { User } from "../../models/user.model";



export class AddAccessToUserUseCase{
    constructor(private userRepository:UserRepositoryInterface, private accessRepository:AccessRepositoryInterface){}

    async execute(input:AddAccessToUserInput):Promise<AddAccessToUserOutput>{
        
        let user: User | null = await this.userRepository.findById(input.id);
        if (!user) {
            throw new UserNotFoundError();
        }
      
        
        input.newAccessName = input.newAccessName.toUpperCase()
        
        const doesAccessExist = await this.accessRepository.doesAccessExist([input.newAccessName]);
        if (!doesAccessExist) {
            throw new AccessNameDoesNotExist();
        }
        if (user.AccessName.includes(input.newAccessName)) {
            
            throw new AccessAlreadyExistsError
          }
        const updatedUser:User = await this.userRepository.AddAccessToUserUseCase({id:input.id,newAccess:input.newAccessName})

        return updatedUser.toDTO()
    }
}


type AddAccessToUserInput = {
    id:string,
    newAccessName:string
}

type AddAccessToUserOutput = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    numberAddress: number;
    AccessName: string[];
}