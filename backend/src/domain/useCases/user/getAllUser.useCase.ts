import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface"
export class GetAllUserUseCase {
    constructor(private userRepository:UserRepositoryInterface){}

    async execute():Promise<GetUserUseCaseOutput>{
        
        const users = await this.userRepository.findAll()
        return users.map(user => user.toDTO())
    }
}




type GetUserUseCaseOutput ={
    id?: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    store?:StoreUser[]
    numberAddress: number;
    AccessName: string[];
}[]


type StoreUser = {
    name:string
    categories:string[]
    description:string
}