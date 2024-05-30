import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface"
import { SaleNotFoundError } from "../../../errors/errors"

export class DeleteSaleUseCase {
    constructor(private saleRepository:SaleRepositoryInterface){}
    async execute(input:DeleteSaleInput):Promise<DeleteSaleOutput>{
        
        const doesSaleExist  = await this.saleRepository.findById(input.saleId)
        //console.log(doesSaleExist)
        if(!doesSaleExist ){
            throw new SaleNotFoundError()
        }

       await this.saleRepository.delete({sellerId:input.sellerId,saleId:input.saleId})
       

       return {message:"Pedido deletado com sucesso"}
    }
}

type DeleteSaleInput = {
    sellerId:string
    saleId:string
}

type DeleteSaleOutput = {
    message:string
}

