import { Sale } from "../../domain/models/sale.model";

export interface SaleRepositoryInterface{
    insert(sale:Sale):Promise<Sale>
    findById(id: string): Promise<Sale | null>;
    findAll(): Promise<Sale[]>;
    findAllBySellerId(sellerId: string): Promise<Sale[]>;
    findAllByBuyerId(buyerId: string): Promise<Sale[]>;
    update(sale: Sale): Promise<Sale>;
    delete(id: string): Promise<boolean>;
}