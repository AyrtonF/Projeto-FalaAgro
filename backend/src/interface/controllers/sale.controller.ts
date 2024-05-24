import { Request, Response } from "express";
import { handleErrors } from "../../errors/hadler.errors";
import { InternalServerError } from "../../errors/errors";
import { CreateSaleUseCase } from "../../domain/useCases/sales/createSale.useCase";
import { GetAllSaleUseCase } from "../../domain/useCases/sales/getAllSale.useCase";
import { GetSaleByIdUseCase } from "../../domain/useCases/sales/getSaleById.useCase";
type SaleControllerInput = {
    createSaleUseCase: CreateSaleUseCase
    getAllSaleUseCase: GetAllSaleUseCase
    getSaleByIdUseCase: GetSaleByIdUseCase
}


export class SaleController {
    constructor(private input: SaleControllerInput) {}

    async createSale(request: Request, response: Response): Promise<Response> {
        try {
            const { products, userSellerId} = request.body;
            const {id} = request.user

            const  userBuyerId = id 

            const input = { products, userSellerId, userBuyerId, };
            const output = await this.input.createSaleUseCase.execute(input);

            return response.status(201).json(output);
        }catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }

    }
    async getAllSales(request: Request, response: Response): Promise<Response> {
        try {
    
          const sales = await this.input.getAllSaleUseCase.execute();
          return response.status(201).json(sales);
        } catch (error: unknown) {
                if (error instanceof Error) {
                    const errorResponse = handleErrors(error); 
                    return response.status(errorResponse.status).json(errorResponse.message); 
                } else {
                   throw new InternalServerError
                }
            }
      }

      async getSaleById(request: Request, response: Response): Promise<Response> {
        try {
           const {saleId} = request.body
          const sale = await this.input.getSaleByIdUseCase.execute({saleId});
          return response.status(201).json(sale);
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