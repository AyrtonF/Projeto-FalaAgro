import { Request, Response } from 'express'
import { CreateStoreUseCase } from '../../domain/useCases/store/createStore.useCase'


type StoreControllerInput = {
    createStoreUseCase: CreateStoreUseCase
}


export class StoreController {
    constructor(private input: StoreControllerInput) { }

    async createStore(request: Request, response: Response):Promise<Response> {
        
        try {
            const {id,userId,name,products,description,images,categories,contactInfo,openingHours,returnPolicy,followers,reviews,createdAt,updatedAt} = request.body;
            const store = await this.input.createStoreUseCase.execute({id,userId,name,products,description,images,categories,contactInfo,openingHours,returnPolicy,followers,reviews,createdAt,updatedAt})
            return response.status(200).json(store)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

