import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { EmailNotFoundError, IncorrectPasswordError, SecretKeyNotProvidedError } from "../../../errors/user.errors";

export class SignInUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(input: SignInInput): Promise<SignInOutput> {
        const { email, password } = input;

        
        const userExists = await this.userRepository.doesUserExist(email);
        if (!userExists) {
            throw new EmailNotFoundError();
        }

       
        const storedPassword = await this.userRepository.getPasswordByEmail(email);

        
        const isPasswordValid = await compare(password, storedPassword);
        if (!isPasswordValid) {
            throw new IncorrectPasswordError();
        }

       
        const userRoles = await this.userRepository.getRolesUserByEmail(email);

        const secretKey = process.env.MY_SECRET_KEY;
        if (!secretKey) {
            throw new SecretKeyNotProvidedError();
        }

        // Gerar o token de autenticação
        const token = sign({ roles: userRoles }, secretKey, {
            algorithm: "HS256",
            expiresIn: "1h",
        });

        return { token };
    }
}

type SignInInput = {
    email: string;
    password: string;
};

type SignInOutput = {
    token: string;
};
