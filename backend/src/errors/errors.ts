
export class DuplicateEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Email já existente");
        this.name = "DuplicateEmailError";
        this.status = status || 409; // Conflict
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class AccessNameDoesNotExist extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nível de acesso não existe");
        this.name = "AccessNameDoesNotExist";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}
export class UserDoesNotHaveAccess extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Usuário não possui acesso");
        this.name = "UserDoesNotHaveAccess";
        this.status = status || 403; // Forbidden
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}
export class InvalidEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Email inválido");
        this.name = "InvalidEmailError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidCPFError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "CPF inválido");
        this.name = "InvalidCPFError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidCNPJError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "CNPJ inválido");
        this.name = "InvalidCNPJError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidCEPError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "CEP inválido");
        this.name = "InvalidCEPError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidNumberAddressError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Número de endereço inválido");
        this.name = "InvalidNumberAddressError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class UnauthorizedError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Não autorizado");
        this.name = "UnauthorizedError";
        this.status = status || 401; // Unauthorized
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class ForbiddenError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Proibido");
        this.name = "ForbiddenError";
        this.status = status || 403; // Forbidden
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class UserNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Usuário não encontrado");
        this.name = "UserNotFoundError";
        this.status = status || 404; // Not Found
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InternalServerError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro interno do servidor");
        this.name = "InternalServerError";
        this.status = status || 500; // Internal Server Error
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}
export class EmailNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "E-mail não encontrado");
        this.name = "EmailNotFoundError";
        this.status = status || 404; // Not Found
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class IncorrectPasswordError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Senha incorreta");
        this.name = "IncorrectPasswordError";
        this.status = status || 401; // Unauthorized
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class SecretKeyNotProvidedError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Chave secreta não fornecida");
        this.name = "SecretKeyNotProvidedError";
        this.status = status || 500; // Internal Server Error
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}
export class MissingIdentifierError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "E-mail ou ID deve ser fornecido");
        this.name = "MissingIdentifierError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}
export const UserErrors = {
    duplicateEmailError: new DuplicateEmailError(),
    accessNameDoesNotExistError: new AccessNameDoesNotExist(),
    invalidEmailError: new InvalidEmailError(),
    invalidCPFError: new InvalidCPFError(),
    invalidCNPJError: new InvalidCNPJError(),
    invalidCEPError: new InvalidCEPError(),
    invalidNumberAddressError: new InvalidNumberAddressError(),
    unauthorizedError: new UnauthorizedError(),
    forbiddenError: new ForbiddenError(),
    userNotFoundError: new UserNotFoundError(),
    internalServerError: new InternalServerError(),
    emailNotFoundError: new EmailNotFoundError(),
    incorrectPasswordError: new IncorrectPasswordError(),
    secretKeyNotProvidedError: new SecretKeyNotProvidedError(),
    missingIdentifierError: new MissingIdentifierError(),
};

