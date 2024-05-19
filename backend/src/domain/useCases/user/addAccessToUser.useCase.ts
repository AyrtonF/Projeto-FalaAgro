import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { AccessNameDoesNotExist, UserNotFoundError } from "../../../errors/errors";
import { User } from "../../models/user.model";
import { convertStringsToUppercase } from "../../../../functions/toUpperCase";


export class AddAccessToUserUseCase{
    constructor(private userRepository:UserRepositoryInterface, private accessRepository:AccessRepositoryInterface){}

    async execute(input:AddAccessToUserInput):Promise<AddAccessToUserOutput>{
        
        let user: User | null = await this.userRepository.findById(input.id);
        if (!user) {
            throw new UserNotFoundError();
        }

        const doesAccessExist = await this.accessRepository.doesAccessExist([input.newAccessName]);
        if (!doesAccessExist) {
            throw new AccessNameDoesNotExist();
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