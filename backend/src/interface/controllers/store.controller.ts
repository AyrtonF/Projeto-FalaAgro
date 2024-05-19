import { Request, Response } from 'express'
import { CreateStoreUseCase } from '../../domain/useCases/store/createStore.useCase'
import { InternalServerError } from '../../errors/errors';
import { handleErrors } from '../../errors/hadler.errors';
import { GetStoreByIdUseCase } from '../../domain/useCases/store/getStoreById.useCase';
import { GetAllStoreUseCase } from '../../domain/useCases/store/getAllStore.useCase';
type StoreControllerInput = {
    createStoreUseCase: CreateStoreUseCase
    getStoreByIdUseCase: GetStoreByIdUseCase
    getAllStoreUseCase: GetAllStoreUseCase
}


export class StoreController {
    constructor(private input: StoreControllerInput) { }

    async createStore(request: Request, response: Response):Promise<Response> {
        
        try {
            const {name,Products,description,images,categories,contactInfo,openingHours,returnPolicy,followers,reviews,createdAt,updatedAt} = request.body;
            const {id} = request.user
            const userId = id
            const store = await this.input.createStoreUseCase.execute({userId,name,Products,description,images,categories,contactInfo,openingHours,returnPolicy,followers,reviews,createdAt,updatedAt})
            return response.status(200).json(store)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
    async getAllStore(request: Request, response: Response):Promise<Response> {
        
        try {
          
            const stores = await this.input.getAllStoreUseCase.execute()
            return response.status(200).json(stores)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }

    async getStoreById(request: Request, response: Response):Promise<Response> {
        
        try {
            const {storeId} = request.params;
            const store = await this.input.getStoreByIdUseCase.execute(storeId)
            return response.status(200).json(store)
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
    }
}

