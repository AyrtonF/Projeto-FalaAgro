
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { SaleNotFoundError } from "../../../errors/errors";
import { Sale } from "../../models/sale.model";

export class GetSaleByIdUseCase {
    constructor(private saleRepository: SaleRepositoryInterface) {}
    async execute(input: GetSaleByIdInput):Promise<GetSaleByIdOutput>{
        const sale:Sale|null = await this.saleRepository.findById(input.saleId)
        if (!sale) {
            throw new SaleNotFoundError()
        }
        return sale.toJSON()
    }
}
type GetSaleByIdInput = {
    saleId:string
}
type GetSaleByIdOutput = {
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

