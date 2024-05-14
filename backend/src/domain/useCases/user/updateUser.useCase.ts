import { User } from "../../models/user.model";
import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryInferface) {}

    async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
        
        let user: User | null = await this.userRepository.findById(input.id);

        if (!user) {
            throw new Error("Usuário não existe");
        }

        
        if (input.name) user.name = input.name;
        if (input.email) user.email = input.email;
        if (input.password) user.password = input.password;
        if (input.cpf) user.cpf = input.cpf;
        if (input.cnpj) user.cnpj = input.cnpj;
        if (input.cep) user.cep = input.cep;
        if (input.numberAddress) user.numberAddress = input.numberAddress;

        
        const newUser = await this.userRepository.update(user);
        return newUser.toJSON()
    }
}


export type UpdateUserInput = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    cpf?: string;
    cnpj?: string;
    cep?: string;
    numberAddress?: number;
}

export type UpdateUserOutput = {
    id?: string; 
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt?:Date
    updatedAt?:Date
}
