import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { DuplicateEmailError, AccessNameDoesNotExist } from "../../../errors/errors";
import { User } from "../../models/user.model";
import { hash } from "bcryptjs";
export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepositoryInterface,
        private accessRepository: AccessRepositoryInterface
    ) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        // Hash da senha antes de salvar
        

        input.password = await hash(input.password, 8);

        // Validar se o e-mail é único
        const isEmailUnique = await this.userRepository.isUniqueEmail(input.email);
        if (!isEmailUnique) {
            throw new DuplicateEmailError();
        }

        // Validar se o acesso existe
        const doesAccessExist = await this.accessRepository.doesAccessExist(input.AccessName);
        if (!doesAccessExist) {
            throw new AccessNameDoesNotExist();
        }

        // Inserir usuário no repositório
        const user = await this.userRepository.insert(new User(input));

        return user.toJSON();
    }
}

// Tipos de entrada e saída
type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string;
    cep: string;
    numberAddress: number;
    AccessName: string[];
    createdAt?: Date;
    updatedAt?: Date;
};

type CreateUserOutput = Omit<CreateUserInput, "password">; 
