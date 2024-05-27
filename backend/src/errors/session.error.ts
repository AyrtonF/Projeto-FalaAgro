export class SessionError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class IdError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no id");
        this.name = "IdError";
        this.status = status || 400; 
    }
}

export class UserIdError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no id de usuário");
        this.name = "UserIdError";
        this.status = status || 400; 
    }
}

export class UserEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no email de usuário");
        this.name = "UserEmailError";
        this.status = status || 400; 
    }
}

export class TokenError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no Token");
        this.name = "TokenError";
        this.status = status || 400; 
    }
}

export class RolesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no Roles");
        this.name = "RolesError";
        this.status = status || 400; 
    }
}

export class CreatedAtError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro ao criar");
        this.name = "CreatedAtError";
        this.status = status || 400; 
    }
}

export class UpdatedAtError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro ao atualizar");
        this.name = "UpdatedAtError";
        this.status = status || 400; 
    }
}