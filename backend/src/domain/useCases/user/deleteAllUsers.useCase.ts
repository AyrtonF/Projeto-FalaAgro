import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface"


export class DeleteAllUsersUseCase{
    constructor(private userRepository:UserRepositoryInferface){}
    async execute():Promise<any>{
        await this.userRepository.deleteAll()
    }
}