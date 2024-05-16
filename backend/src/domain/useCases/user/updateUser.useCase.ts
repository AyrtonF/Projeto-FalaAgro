 
import { User } from "../../models/user.model";
import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { UserNotFoundError } from "../../../errors/errors";
export class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
        // Verificar se pelo menos um campo de atualização foi fornecido
        if (!input.name && !input.email && !input.password && !input.cpf && !input.cnpj && !input.cep && !input.numberAddress) {
            throw new Error("Pelo menos um campo de atualização deve ser fornecido");
        }

        // Buscar o usuário pelo ID
        let user: User | null = await this.userRepository.findById(input.id);

        // Se o usuário não existir, lançar erro
        if (!user) {
            throw new UserNotFoundError();
        }
        // Atualizar os campos do usuário se eles foram fornecidos
        if (input.name) user.name = input.name;
        if (input.email) user.email = input.email;
        if (input.password) user.password = input.password;
        if (input.cpf) user.cpf = input.cpf;
        if (input.cnpj) user.cnpj = input.cnpj;
        if (input.cep) user.cep = input.cep;
        if (input.numberAddress) user.numberAddress = input.numberAddress;

        // Atualizar o usuário no repositório
        const updatedUser = await this.userRepository.update(user);

        // Retornar os dados atualizados do usuário
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            cpf: updatedUser.cpf,
            cnpj: updatedUser.cnpj,
            cep: updatedUser.cep,
            numberAddress: updatedUser.numberAddress,
            AccessName: updatedUser.AccessName // Certifique-se de que o modelo User tenha o campo AccessName
        };
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
    id: string;
    name: string;
    email: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    numberAddress: number;
    AccessName: string[];
}