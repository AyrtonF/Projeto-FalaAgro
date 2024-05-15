export class ProductError extends Error {
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

export class DuplicateIdError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "ID já existe");
        this.name = "DuplicateIdError";
        this.status = status || 409; 
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

export class DescriptionProductError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Descrição invalida");
        this.name = "DescriptionErrorProductError";
        this.status = status || 400; 
    }
}

export class PriceError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro no preço");
        this.name = "PriceError";
        this.status = status || 400; 
    }
}

export class QuantityAvailableError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro na Quantidade");
        this.name = "QuantityAvailableError";
        this.status = status || 400; 
    }
}

export class ImagesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro na imagem");
        this.name = "ImagesError";
        this.status = status || 400; 
    }
}

export class CategoriesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro na categoria");
        this.name = "CategoriesError";
        this.status = status || 400; 
    }
}