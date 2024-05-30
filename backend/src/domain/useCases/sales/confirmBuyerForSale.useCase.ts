
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { NotBuyerOfOrderError, SaleNotFoundError } from "../../../errors/errors";
import { Sale } from "../../models/sale.model";

export class ConfirmBuyerForSaleUseCase {
    constructor(private saleRepository: SaleRepositoryInterface) {}
    async execute(input: ConfirmBuyerForSaleInput):Promise<ConfirmBuyerForSaleOutput>{
        const sale:Sale|null = await this.saleRepository.findById(input.saleId)
        if (!sale) {
            throw new SaleNotFoundError()
        }
        if(input.userBuyerId != sale.userBuyerId){
            throw new NotBuyerOfOrderError("Você não é o comprador de desse pedido")
        }
        sale.buyerConfirmed = true
        let saleUpdated = await this.saleRepository.update(sale)
        return saleUpdated.toJSON()
    }
}
type ConfirmBuyerForSaleInput = {
    saleId:string
    userBuyerId:string
}
type ConfirmBuyerForSaleOutput = {
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
};

type ProductSale = {
    id: string;
    quantify: number;
};

