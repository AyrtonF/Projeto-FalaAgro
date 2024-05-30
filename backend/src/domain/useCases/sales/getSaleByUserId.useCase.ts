
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { SaleNotFoundError } from "../../../errors/errors";
import { Sale } from "../../models/sale.model";

export class GetSaleByUserIdUseCase {
    constructor(private saleRepository: SaleRepositoryInterface) {}
    async execute(input: GetSaleByUserIdInput):Promise<GetSaleByUserIdOutput>{
        const sales:Sale[] = await this.saleRepository.findAllByBuyerId(input.userId)
        if (!sales) {
            throw new SaleNotFoundError()
        }
        return sales.map(sale => sale.toJSON())
    }
}
type GetSaleByUserIdInput = {
    userId:string
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

