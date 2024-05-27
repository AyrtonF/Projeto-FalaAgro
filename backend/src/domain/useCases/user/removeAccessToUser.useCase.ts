import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { AccessNameDoesNotExist, UserDoesNotHaveAccess, UserNotFoundError } from "../../../errors/errors";
import { User } from "../../models/user.model";


export class RemoveAccessToUserUseCase{
    constructor(private userRepository:UserRepositoryInterface, private accessRepository:AccessRepositoryInterface){}

    async execute(input:RemoveAccessToUserInput):Promise<RemoveAccessToUserOutput>{
        let user: User | null = await this.userRepository.findById(input.id);
        if (!user) {
            throw new UserNotFoundError();
        }

        const doesAccessExist = await this.accessRepository.doesAccessExist([input.accessName]);
        if (!doesAccessExist) {
            throw new AccessNameDoesNotExist();
        }

        if(!(user.AccessName.some(access => access === input.accessName))){
            throw new UserDoesNotHaveAccess()
        }
        const updatedUser:User = await this.userRepository.RemoveAccessToUserUseCase({accessName:input.accessName,userId:input.id})

        return updatedUser.toDTO()
    }
}


type RemoveAccessToUserInput = {
    id:string,
    accessName:string
}

type RemoveAccessToUserOutput = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    numberAddress: number;
    AccessName: string[];
}