
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { MissingRequiredFieldsError, SaleNotFoundError } from "../../../errors/errors";
import { Sale } from "../../models/sale.model";

export class GetSaleByUserIdUseCase {
    constructor(private saleRepository: SaleRepositoryInterface) {}
    async execute(input: GetSaleByUserIdInput):Promise<GetSaleByUserIdOutput>{
        if(!input.buyerId && !input.sellerId){
            throw new MissingRequiredFieldsError("Algum ou alguns campos obrigatórios não foram fornecidos.");
        }
        let sales:Sale[] = []
        if(input.buyerId){
             sales = await this.saleRepository.findAllByBuyerId(input.buyerId)    
        }
        else if(input.sellerId){
             sales = await this.saleRepository.findAllBySellerId(input.sellerId)
        }
        
        if (!sales) {
            throw new SaleNotFoundError()
        }
        return sales.map(sale => sale.toJSON())
    }
}
type GetSaleByUserIdInput = {
    buyerId?:string
    sellerId?:string
}
type GetSaleByUserIdOutput = {
    id: string;
    products: ProductSale[];
    userSellerId: string;
    userBuyerId: string;
    totalValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    buyerConfirmed: boolean;
    sellerConfirmed: boolean;
    status: 'completed' | 'pending' | 'canceled';
}[];

type ProductSale = {
    id: string;
    quantify: number;
};

