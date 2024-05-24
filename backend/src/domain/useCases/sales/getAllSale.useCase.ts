
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { Sale } from "../../models/sale.model";

export class GetAllSaleUseCase {
    constructor(private saleRepository: SaleRepositoryInterface) {}
    async execute():Promise<GetAllSaleOutput>{
        const sales:Sale[] = await this.saleRepository.findAll()
        return sales.map(sale => sale.toJSON())
    }
}

type GetAllSaleOutput = {
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

