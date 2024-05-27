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

        return user.toDTO()
    }
}


type GetUserByIdOutput =  {
    id?: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    store?:StoreUser[]
    numberAddress: number;
    AccessName: string[];
}
type StoreUser = {
    name:string
    categories:string[]
    description:string
}