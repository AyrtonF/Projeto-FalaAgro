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

export class InvalidNameError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Esse nome é invalido");
        this.name = "InvalidNameError";
        this.status = status || 400; 
    }
}

export class InvalidEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Esse Email é invalido");
        this.name = "InvalidEmailError";
        this.status = status || 400; 
    }
}

export class InvalidPasswordError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "A senha é invalida");
        this.name = "InvalidPasswordError";
        this.status = status || 400; 
    }
}

export class InvalidCpfError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O CPF é invalido");
        this.name = "InvalidPasswordError";
        this.status = status || 400; 
    }
}

export class InvalidCnpjError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O CPJ é invalido");
        this.name = "InvalidCnpjError";
        this.status = status || 400; 
    }
}

export class InvaidCpeError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O CEP é invalido");
        this.name = "InvaidCpeError";
        this.status = status || 400; 
    }
}

export class InvalidNumberAddresssError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O Número de endereço é muito grande ou muito pequero");
        this.name = "InvalidNumberAddresssError";
        this.status = status || 400; 
    }
}

export class InvalidAcessNameError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Esse  acesso não existe");
        this.name = "InvalidAcessNameErro";
        this.status = status || 404; 
    }
}

export class UnauthorizedError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Não logado");
        this.name = "UnauthorizedError";
        this.status = status || 401; 
    }
}

export class ForbiddenError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Não autorizado");
        this.name = "ForbiddenError";
        this.status = status || 403; 
    }
}

export class UserNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Usuário não encontrado");
        this.name = "UserNotFoundError";
        this.status = status || 404; 
    }
}

export class InternalServerErrorError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro do Servidor Interno");
        this.name = "InternalServerErrorError";
        this.status = status || 500; 
    }
}
