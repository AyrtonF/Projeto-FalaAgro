
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

export class AccessNameDoesExist extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nível de acesso já existe");
        this.name = "AccessNameDoesExist";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class DuplicateProductNameError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O nome do produto já Existe na sua loja.");
        this.name = "DuplicateProductNameError";
        this.status = status || 409; // Conflict
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class MissingRequiredFieldsError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Um ou mais campos obrigatórios não foram fornecidos.");
        this.name = "MissingRequiredFieldsError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class ProductNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Produto não encontrado.");
        this.name = "ProductNotFoundError";
        this.status = status || 404; // Not Found
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
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

export class UserNotLoggedInError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Usuário não logado, faça login para acessar.");
        this.name = "UserNotLoggedInError";
        this.status = status || 401; // Unauthorized
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidPriceFormatError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O formato do preço está incorreto. Verifique se você digitou corretamente.");
        this.name = "InvalidPriceFormatError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class InvalidStockAmountError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "O valor de estoque informado está inválido. Verifique se você digitou o valor corretamente.");
        this.name = "InvalidStockAmountError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}
export class UserNotOwnerError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Usuário não é o dono da loja");
        this.name = "UserNotOwnerError";
        this.status = status || 403; // Forbidden
    }
    toJSON(){
        return { name: this.name, status: this.status, message: this.message };
    }
}




export class MinLengthError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nome curto, mínimo 2 caracteres, verifique se digitou corretamente." || "Descrição curta, mínimo 15 caracteres, tente novamente." );
        this.name = "MinLengthError";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}

export class DuplicateImagesError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Todas as imagens fornecidas já estão presentes no produto.");
        this.name = "DuplicateImagesError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class ImagesNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nenhuma das imagens fornecidas está presente no produto.");
        this.name = "ImagesNotFoundError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class TagsDuplicatedError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "As tags fornecidas já estão presentes no produto.");
        this.name = "TagsDuplicatedError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class TagsNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nenhuma das tags fornecidas está presente no produto.");
        this.name = "TagsNotFoundError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class CategoriesDuplicatedError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "As categorias fornecidas já estão presentes no produto.");
        this.name = "CategoriesDuplicatedError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}
export class SelfSaleError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Não pode existir venda para si mesmo.");
        this.name = "SelfSaleError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}

export class CategoriesNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nenhuma das categorias fornecidas está presente no produto.");
        this.name = "CategoriesNotFoundError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}
export class InsufficientStockError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Quantidade de produto solicitada é maior que o estoque.");
        this.name = "InsufficientStockError";
        this.status = status || 400; // Bad Request
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
    }
}
export class SaleNotFoundError extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Pedido não encontrado.");
        this.name = "SaleNotFoundError";
        this.status = status || 404; // Not Found
    }
    toJSON() {
        return { name: this.name, status: this.status, message: this.message };
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
    accessNameDoesExist: new AccessNameDoesExist(),
    minLengthError: new MinLengthError(),
    invalidStockAmountError: new InvalidStockAmountError(),
    invalidPriceFormatError: new InvalidPriceFormatError(),
    userNotLoggedInError: new UserNotLoggedInError(),
    productNotFoundError: new ProductNotFoundError(),
    missingRequiredFieldsError: new MissingRequiredFieldsError(),
    duplicateProductNameError: new DuplicateProductNameError(),
    userNotOwnerError: new UserNotOwnerError(),
    duplicateImagesError: new DuplicateImagesError(),
    imagesNotFoundError: new ImagesNotFoundError(),
    tagsDuplicatedError: new TagsDuplicatedError(),
    tagsNotFoundError: new TagsNotFoundError(),
    categoriesDuplicatedError: new CategoriesDuplicatedError(),
    categoriesNotFoundError: new CategoriesNotFoundError(),
    negativePriceError: new NegativePriceError(),
    selfSaleError: new SelfSaleError(),
    insufficientStockError: new InsufficientStockError(),
    saleNotFoundError: new SaleNotFoundError(),
};