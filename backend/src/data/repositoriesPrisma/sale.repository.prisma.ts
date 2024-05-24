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
                SaleProduct:{include:{
                    Product:true
                }},
                
            },
        });
        
       
        
        return this.mapPrismSaleToDomain(salePrisma)
        
    }catch (error) {
       
        if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
        throw new InternalServerError
    }
       
    }
    async findById(id: string): Promise<Sale | null> {
        try {
            const salesPrisma = await prisma.sale.findUnique({
                where:{
                    id
                },
                include: {
                    SaleProduct:{include:{
                        Product:true
                    }},
                    
                },
            })
          
            return this.mapPrismSaleToDomain(salesPrisma)

        } catch (error) {
       
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async findAll(): Promise<Sale[]> {
        try {
            const salesPrisma = await prisma.sale.findMany({
                include: {
                    SaleProduct:{include:{
                        Product:true
                    }},
                    
                },
            })
          
            return salesPrisma.map((salePrisma)=> this.mapPrismSaleToDomain(salePrisma))

        } catch (error) {
       
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
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
      
        type ProductSale = {
            id: string;
            name: string;
            quantify: number;
            price: number;
        };
    
        
        
        const products: ProductSale[] = prismaSale.SaleProduct.map((productPrisma: any) => {
      
            return {
                id: productPrisma.Product.id,
                name: productPrisma.Product.name,
                quantify: productPrisma.quantify,
                price: productPrisma.Product.price,
            };
        });

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
            products: products,
        });
    }
}
