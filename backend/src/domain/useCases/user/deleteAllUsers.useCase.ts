import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface"


export class DeleteAllUsersUseCase{
    constructor(private userRepository:UserRepositoryInterface){}
    async execute():Promise<any>{
        await this.userRepository.deleteAll()
    }
}