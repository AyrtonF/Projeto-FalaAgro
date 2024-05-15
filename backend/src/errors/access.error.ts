export class AccessError extends Error {
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

export class InvalidNameError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nome invalido");
        this.name = "IdError";
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