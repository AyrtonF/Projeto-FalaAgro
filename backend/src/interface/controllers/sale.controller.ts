import { Request, Response } from "express";
import { handleErrors } from "../../errors/hadler.errors";
import { InternalServerError } from "../../errors/errors";
import { CreateSaleUseCase } from "../../domain/useCases/sales/createSale.useCase";


type SaleControllerInput = {
    createSaleUseCase: CreateSaleUseCase
    
}


export class SaleController {
    constructor(private input: SaleControllerInput) {}

    async createSale(request: Request, response: Response): Promise<Response> {
        try {
            const { products, userSellerId,userBuyerId} = request.body;
            

            const input = { products, userSellerId, userBuyerId, };
            const output = await this.input.createSaleUseCase.execute(input);

            return response.status(201).json(output);
        }catch (error: unknown) {
            console.log(error.message)
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }

    }
}