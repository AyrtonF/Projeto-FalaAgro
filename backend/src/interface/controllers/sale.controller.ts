import { Request, Response } from "express";
import { handleErrors } from "../../errors/hadler.errors";
import { InternalServerError } from "../../errors/errors";
import { CreateSaleUseCase } from "../../domain/useCases/sales/createSale.useCase";
import { GetAllSaleUseCase } from "../../domain/useCases/sales/getAllSale.useCase";
import { GetSaleByIdUseCase } from "../../domain/useCases/sales/getSaleById.useCase";
import { GetSaleByUserIdUseCase } from "../../domain/useCases/sales/getSaleByUserId.useCase";
import { ConfirmSellerForSaleUseCase } from "../../domain/useCases/sales/confirmSellerForSale.useCase";
import { ConfirmBuyerForSaleUseCase } from "../../domain/useCases/sales/confirmBuyerForSale.useCase";
import { DeleteSaleUseCase } from "../../domain/useCases/sales/deleteSale.useCase";
type SaleControllerInput = {
    createSaleUseCase: CreateSaleUseCase
    getAllSaleUseCase: GetAllSaleUseCase
    getSaleByIdUseCase: GetSaleByIdUseCase
    getSaleByUserIdUseCase:GetSaleByUserIdUseCase
    confirmSellerForSaleUseCase: ConfirmSellerForSaleUseCase
    confirmBuyerForSaleUseCase: ConfirmBuyerForSaleUseCase
    deleteSaleUseCase: DeleteSaleUseCase
}


export class SaleController {
    constructor(private input: SaleControllerInput) {}

    async createSale(request: Request, response: Response): Promise<Response> {
        try {
            const { products,storeId} = request.body;
            const {id} = request.user

            const  userBuyerId = id 

            const input = { products, userBuyerId,storeId };
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
      async getSaleByBuyerId(request: Request, response: Response): Promise<Response> {
        try {
            
           const { id } = request.user
           let buyerId = id
          const sales = await this.input.getSaleByUserIdUseCase.execute({buyerId});
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
      async getSaleBySellerId(request: Request, response: Response): Promise<Response> {
        try {
            
           const { id } = request.user
           let sellerId = id
          const sales = await this.input.getSaleByUserIdUseCase.execute({sellerId});
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
      async confirmBuyerForSale (request: Request, response: Response): Promise<Response> {
        try {
            const { saleId} = request.body;
            const {id} = request.user

            const  userBuyerId = id 

            const input = { saleId, userBuyerId };
            const output = await this.input.confirmBuyerForSaleUseCase.execute(input);

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
    async confirmSellerForSale (request: Request, response: Response): Promise<Response> {
        try {
            const { saleId} = request.body;
            const {id} = request.user

            const  userSellerId = id 

            const input = { saleId, userSellerId };
            const output = await this.input.confirmSellerForSaleUseCase.execute(input);

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
    async deleteSale(request: Request, response: Response) {
        try {
            const {id} = request.user
            const {saleId} = request.body
            const sellerId = id
            const message = await this.input.deleteSaleUseCase.execute({sellerId,saleId});
            return response.status(201).json(message);
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