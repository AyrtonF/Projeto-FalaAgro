import { Sale } from "../../domain/models/sale.model";
import { InternalServerError, ProductNotFoundError, SaleNotFoundError } from "../../errors/errors";
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
            console.log(salesPrisma)
            if (!salesPrisma){
                return salesPrisma
            }
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
    async findAllBySellerId(sellerId: string): Promise<Sale[]> {
        try {
            const salesPrisma = await prisma.sale.findMany({
                where:{sellerId},
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
    async findAllByBuyerId(buyerId: string): Promise<Sale[]> {
        try {
            const salesPrisma = await prisma.sale.findMany({
                where:{buyerId},
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
    async update(sale: Sale): Promise<Sale> {
        try {
            let valid = await (prisma.sale.findUnique({ where: { id:sale.id } })) ? true : false
            if(!valid){
                throw new SaleNotFoundError
            }
            if(sale.buyerConfirmed && sale.sellerConfirmed){
                sale.status = "completed"
            }
            const updatedSaleFromPrisma = await prisma.sale.update({
                where: {
                    id: sale.id
                },
                include: {
                    SaleProduct:{include:{
                        Product:true
                    }},
                   
                },
                data: {
                    totalValue: sale.totalValue,
                    buyerConfirmed: sale.buyerConfirmed,
                    sellerConfirmed: sale.sellerConfirmed,
                    status:sale.status,
                   
                },
            });
           
            return this.mapPrismSaleToDomain(updatedSaleFromPrisma);
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async delete({sellerId,saleId}:{sellerId:string,saleId:string}): Promise<boolean> {
        try {
         
          const  salePrisma = await prisma.sale.delete({
                where: {
                    id: saleId,
                 
                    Seller:{
                        id:sellerId
                    }
                },
                include:{
                    Seller:true
                }
            });
            //console.log(salePrisma.Seller)
            const valid = await (prisma.sale.findUnique({ where: { id:saleId } })) ? true : false
            return valid
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
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
