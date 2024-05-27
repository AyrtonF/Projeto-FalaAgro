import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface"
import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface"
export class GetAllAccessUseCase {
    constructor(private accessRepository:AccessRepositoryInterface){}

    async execute():Promise<GetAccessUseCaseOutput>{
        
        const users = await this.accessRepository.findAll()
        return users.map(user => user.toJSON())
    }
}




type GetAccessUseCaseOutput = {
    id?: string; 
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}[]