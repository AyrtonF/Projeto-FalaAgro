export class StoreError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class InvalidNameError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nome invalido");
        this.name = "InvalidNameError";
        this.status = status || 406; 
    }
}

export class InvalidProductError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Produto invalido");
        this.name = "InvalidProductError";
        this.status = status || 400;
    }
}

export class InvalidDescriptionError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Descrição invalida");
        this.name = "DescriptionError";
        this.status = status || 400; 
    }
}

export class ImagesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro de imagem");
        this.name = "ImagesError";
        this.status = status || 400; 
    }
}

export class CategoriesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro na Categoria");
        this.name = "CategoriesError";
        this.status = status || 400; 
    }
}

export class InavalidContactInfoError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Erro na informações de contato");
        this.name = "InavalidContactInfoError";
        this.status = status || 400; 
    }
}

export class InvalidAddressError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Endereço invalido");
        this.name = "InvalidAddressError";
        this.status = status || 400; 
    }
}

export class InvalidEmailError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Email invalido");
        this.name = "InvalidAddressError";
        this.status = status || 400; 
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

export class InvalidPhoneNumberError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Número de telefone invalido");
        this.name = "InvalidPhoneNumberError";
        this.status = status || 400; 
    }
}
