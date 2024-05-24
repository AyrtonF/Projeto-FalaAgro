import { Sale } from "../../domain/models/sale.model";
import { InternalServerError, ProductNotFoundError } from "../../errors/errors";
import { prisma } from "../prisma";
import { SaleRepositoryInterface } from "../repositories/sale.repository.interface";


export class SaleRepositoryPrisma implements SaleRepositoryInterface{
   async insert(sale: Sale): Promise<Sale> {
    try {

      const salePrisma =  await prisma.sale.create({
            data: {
               
                totalValue: sale.totalValue,
                Seller: { connect: { id: sale.userSellerId } },
                Buyer: { connect: { id: sale.userBuyerId } },   
                buyerConfirmed: sale.buyerConfirmed,
                sellerConfirmed: sale.sellerConfirmed,
                status: sale.status,
                SaleProduct: {
                    create: sale.products.map(product => ({
                        productId: product.id,
                        quantify: product.quantify,
                    })),
                },
            }, include: {
                SaleProduct: true,
                
            },
        });
        
        return this.mapPrismSaleToDomain(salePrisma)
        
    }catch (error) {
        console.log("error.message")
        if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
        throw new InternalServerError
    }
       
    }
    findById(id: string): Promise<Sale | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Sale[]> {
        throw new Error("Method not implemented.");
    }
    findAllBySellerId(sellerId: string): Promise<Sale[]> {
        throw new Error("Method not implemented.");
    }
    findAllByBuyerId(buyerId: string): Promise<Sale[]> {
        throw new Error("Method not implemented.");
    }
    update(sale: Sale): Promise<Sale> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    private mapPrismSaleToDomain(prismaSale: any): Sale {
        // Defina o tipo ProductSale
        type ProductSale = {
            id: string;
            name: string;
            quantify: number;
            price: number;
        };
    
        // Mapeie os produtos de prismaSale.SaleProduct para objetos ProductSale
        const products: ProductSale[] = prismaSale.SaleProduct.map((productPrisma: any) => {
            return {
                id: productPrisma.Product.id,
                name: productPrisma.Product.name,
                quantify: productPrisma.quantify,
                price: productPrisma.Product.price,
            };
        });
    console.log(prismaSale)
        // Crie um objeto Sale com os dados mapeados
        return new Sale({
            id: prismaSale.id,
            totalValue: prismaSale.totalValue,
            userSellerId: prismaSale.sellerId,
            userBuyerId: prismaSale.buyerId,
            createdAt: prismaSale.createdAt,
            updatedAt: prismaSale.updatedAt,
            buyerConfirmed: prismaSale.buyerConfirmed,
            sellerConfirmed: prismaSale.sellerConfirmed,
            status: prismaSale.status,
            products: products, // Preencha o array products com os produtos mapeados
        });
    }
}
/* 

  id?: string;
    products: ProductSale[];
    userSellerId: string;
    userBuyerId: string;
    totalValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    buyerConfirmed?: boolean; 
    sellerConfirmed?: boolean; 
    status?: 'completed' | 'pending' | 'canceled';

*/