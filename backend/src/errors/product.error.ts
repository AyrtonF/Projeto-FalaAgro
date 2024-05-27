export class ProductError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class UserNotLoggedInError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Não Autorizado");
        this.name = "UserNotLoggedInError";
        this.status = status || 401; // Status 401 indica "Unauthorized"
    }
}


export class ProductNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Produto não encontrado");
        this.name = "ProductNotFoundError";
        this.status = status || 404; 
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



export class MinLengthError extends Error {
    status: number;
    minLength :number;
    constructor(argumentName?: string, minLength?: number, status?: number) {
        
        super( `${minLength == 0 ? ` O campo '${argumentName}' esta com numero invalido de caracteres` : `O campo '${argumentName}' precisa de no minimo de caracteres é ${minLength}` } caracteres`);
        this.name = "MinLengthError";
        this.status = status || 400;
        this.minLength = minLength || 0 // Status 400 indica "Bad Request"
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
export class NegativePriceError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Preço não pode ser negativo");
        this.name = "NegativePriceError";
        this.status = status || 400; 
    }
}

export class InvalidPriceFormatError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Formato de preço inválido");
        this.name = "InvalidPriceFormatError";
        this.status = status || 400; 
    }
}
export class  InvalidStockAmountError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Quantidade de estoque inválida");
        this.name = "InvalidStockAmountError";
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