import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { UserNotFoundError } from "../../../errors/user.error";
import { User } from "../../models/user.model";

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(userId: string): Promise<GetUserByIdOutput> {
        const user:User|null = await this.userRepository.findById(userId);
        
        if (!user) {
            throw new UserNotFoundError()
        }

        return user.toJSON()
    }
}


type GetUserByIdOutput = Omit<UserDTO, "password">;


interface UserDTO {
    id?: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    numberAddress: number;
    AccessName: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
