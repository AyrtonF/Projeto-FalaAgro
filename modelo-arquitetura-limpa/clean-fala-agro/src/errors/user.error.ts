export class UserError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class DuplicateEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Email já existente");
        this.name = "DuplicateEmailError";
        this.status = status || 409; 
    }
}

export class AccessNameDoesNotExist extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "nivel de acesso não existe");
        this.name = "AccessNameDoesNotExist";
        this.status = status || 400; 
    }
}
/* export const UserErrors = {
    INVALID_NAME: new UserError("Invalid name", 400),
    INVALID_EMAIL: new UserError("Invalid email", 400),
    INVALID_PASSWORD: new UserError("Invalid password", 400),
    INVALID_CPF: new UserError("Invalid CPF", 400),
    INVALID_CNPJ: new UserError("Invalid CNPJ", 400),
    INVALID_CEP: new UserError("Invalid CEP", 400),
    INVALID_NUMBER_ADDRESS: new UserError("Invalid number address", 400),
    INVALID_ACCESS_NAME: new UserError("Invalid access name", 400),
    DUPLICATE_EMAIL: new UserError("Duplicate email", 409),
    UNAUTHORIZED: new UserError("Unauthorized", 401),
    FORBIDDEN: new UserError("Forbidden", 403),
    USER_NOT_FOUND: new UserError("User not found", 404),
    INTERNAL_SERVER_ERROR: new UserError("Internal server error", 500),
}; */
