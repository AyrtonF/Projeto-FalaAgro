import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { EmailNotFoundError, IncorrectPasswordError, SecretKeyNotProvidedError } from "../../../errors/errors";
export class SignInUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(input: SignInInput): Promise<SignInOutput> {
        

        
        const userExists = await this.userRepository.doesUserExist({email:input.email});
        if (!userExists) {
            throw new EmailNotFoundError();
        }

       
        const storedPassword = await this.userRepository.getPasswordByEmail(input.email);

        
        const isPasswordValid = await compare(input.password, storedPassword);
        if (!isPasswordValid) {
            throw new IncorrectPasswordError();
        }

       
        const payload = await this.userRepository.getRolesUserByEmail(input.email);

        const secretKey = process.env.MY_SECRET_KEY;
        if (!secretKey) {
            throw new SecretKeyNotProvidedError();
        }

        // Gerar o token de autenticação
        const token = sign({ userId: payload.userId,roles: payload.roles }, secretKey, {
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
