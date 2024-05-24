import { UserErrors } from "./errors";


const errorMap: Record<string, UserError> = {
    DuplicateEmailError:  UserErrors.duplicateEmailError,
    AccessNameDoesNotExist: UserErrors.accessNameDoesNotExistError,
    InvalidEmailError: UserErrors.invalidEmailError,
    InvalidCPFError: UserErrors.invalidCPFError,
    InvalidCNPJError: UserErrors.invalidCNPJError,
    InvalidCEPError: UserErrors.invalidCEPError,
    InvalidNumberAddressError: UserErrors.invalidNumberAddressError,
    UnauthorizedError: UserErrors.unauthorizedError,
    ForbiddenError: UserErrors.forbiddenError,
    UserNotFoundError: UserErrors.userNotFoundError,
    InternalServerError: UserErrors.internalServerError,
    EmailNotFoundError:  UserErrors.emailNotFoundError,
    IncorrectPasswordError: UserErrors.incorrectPasswordError,
    SecretKeyNotProvidedError:  UserErrors.secretKeyNotProvidedError,
    ProductNotFoundError: UserErrors.productNotFoundError,
    MissingIdentifierError: UserErrors.missingIdentifierError,
    AccessNameDoesExist: UserErrors.accessNameDoesExist,
    UserNotOwnerError: UserErrors.userNotOwnerError,
    DuplicateProductNameError: UserErrors.duplicateProductNameError,
    DuplicateImagesError: UserErrors.duplicateImagesError,
    ImagesNotFoundError: UserErrors.imagesNotFoundError,
    TagsDuplicatedError:UserErrors.tagsDuplicatedError,
    TagsNotFoundError: UserErrors.tagsNotFoundError,
    CategoriesDuplicatedError: UserErrors.categoriesDuplicatedError,
    CategoriesNotFoundError: UserErrors.categoriesNotFoundError,
    NegativePriceError: UserErrors.negativePriceError,
    SelfSaleError: UserErrors.selfSaleError,
    InsufficientStockError: UserErrors.insufficientStockError,
    SaleNotFoundError: UserErrors.saleNotFoundError,
}


export function handleErrors(error: Error): HandleErrorsOutput {
    const errorType = error.constructor.name;
    const errorResponse:UserError = errorMap[errorType];

    if (errorResponse) {
        return { status: errorResponse.status, message: { error: errorResponse.message } };
    } else {
        console.error(error);
        return { status: 500, message: {error:'Erro interno do servidor'} };
    }
}


type HandleErrorsOutput = {
    status:number,
    message:{
    error:string
    }
}
export interface UserError extends Error{
    status:number
    name:string
    message:string
}