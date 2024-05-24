import { Product } from "../../domain/models/product.model";
import { InternalServerError, ProductNotFoundError } from "../../errors/errors";
import { prisma } from "../prisma";
import { ProductRepositoryInterface } from "../repositories/product.repository.interface";

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
  
  async quatifyAmountValid(checkQuantify: any): Promise<boolean> {

    try {
      
      const productsPrisma = await prisma.product.findMany({
        where:{
          id: { in: checkQuantify.map((checkQ: any) => checkQ.id) }
        }
      })
      if(!productsPrisma){
        throw new ProductNotFoundError
      }
     
      for (let index = 0; index < productsPrisma.length; index++) {

        if(checkQuantify[index].quantify > productsPrisma[index].amount ){
           return false
        }
        
      }

      return true
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
  }
  }



  async insert(product: Product): Promise<Product> {
    try {
      const prismaProduct = await prisma.product.create({
        data: {
          Store:{
            connect:{
              id:product.storeId
            } 
              },
              name: product.name,
              description: product.description , 
          price: product.price,
          amount: product.amount,
          images: product.images , 
          categories: product.categories , 
          quantityAvailable: product.quantityAvailable,  
          discount: product.discount,  
          attributes: product.attributes ,
          shippingInfo: product.shippingInfo , 
          status: product.status, 
          sku: product.sku ,  
          brand: product.brand , 
          averageRating: product.averageRating,  
          tags: product.tags , 
        },
      });
      
      return this.mapPrismaProductToDomain(prismaProduct)
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
  }
}
async findByName({name,storeId}:{name: string, storeId:string}): Promise<Product | null> {
  try {
    const productsPrisma = await prisma.product.findMany({
      where:{
        storeId:storeId,
        name:name
      }
    })
    return  this.mapPrismaProductToDomain(productsPrisma[0])
    
  } catch (error) {
    if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
    throw new InternalServerError
  }
  
}
async isDuplicateProductNameInStore({name,storeId}:{name: string, storeId:string}): Promise<boolean> {
  
  try {
    const product = await prisma.store.findUnique({
      where: {
        id: storeId,
        },
        include: {
          Product: {
            where: {
              name,
            },
          },
        },
      });
      return !!product?.Product[0];
      
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
    }
  }
  
  
  async doesProductExist(id?: string, name?: string): Promise<boolean> {
    try {
      let product;
      if (id) {
        product = await prisma.product.findUnique({ where: { id } });
      } else if (name) {
        product = await prisma.product.findMany({ where: { name } });
        product = product[0]
      } else {
        throw new Error("Missing identifier");
      }
      
      return !!product;
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
    }
  }
  
  
  async findById(id: string): Promise<Product | null> {
    try {
      const productPrisma = await prisma.product.findUnique({
        where: { id },
      });
      
      if (!productPrisma) {
        return null;
      }
      
      return this.mapPrismaProductToDomain(productPrisma);
    }  catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
    }
  }
 
async findManyByIds(ids: string[]): Promise<Product[]> {
      const productsPrisma = await prisma.product.findMany({
        where: { id: { in: ids } },
       });
       //console.log(productsPrisma)
    return productsPrisma.map((productPrisma) =>
      this.mapPrismaProductToDomain(productPrisma)
       );
}

async updateQuantity(id: string, quantity: number): Promise<void> {

  await prisma.product.update({
      where: { id: id },
      data: { amount: { decrement: quantity } },
  });
}

async findAll(): Promise<Product[]> {
  try {
      const productsPrisma = await prisma.product.findMany();
      
      return productsPrisma.map((productPrisma) =>
        this.mapPrismaProductToDomain(productPrisma)
      );
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
  }
  }

  async update(product: Product): Promise<Product> {
    try {
      let valid = await (prisma.product.findUnique({ where: { id:product.id } })) ? true : false
      if(!valid){
          throw new ProductNotFoundError();
      }
      const updatedProductFromPrisma = await prisma.product.update({
        where: { id: product.id },
        data: {
          id: product.id,
          storeId: product.storeId,
          name: product.name,
          description: product.description , 
          price: product.price,
          amount: product.amount,
          images: product.images , 
          categories: product.categories , 
          quantityAvailable: product.quantityAvailable,  
          discount: product.discount,  
          attributes: product.attributes ,
          shippingInfo: product.shippingInfo , 
          status: product.status, 
          sku: product.sku ,  
          brand: product.brand , 
          averageRating: product.averageRating,  
          tags: product.tags , 
        },
      });

      return this.mapPrismaProductToDomain(updatedProductFromPrisma);
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
  }
  }

  
    
  
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.saleProduct.deleteMany({
        where: {
          productId: id,
        },
      });
      await prisma.product.delete({ where: { id } });
      const product = await prisma.product.findUnique({ where: { id } });
      return product == null;
    } catch (error) {
      if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
      throw new InternalServerError
  }
  }

  private mapPrismaProductToDomain(prismaProduct: any): Product {
    return new Product({
      id: prismaProduct.id,
      storeId: prismaProduct.storeId,
      name: prismaProduct.name,
      description: prismaProduct.description , 
      price: prismaProduct.price,
      amount: prismaProduct.amount,
      images: prismaProduct.images , 
      categories: prismaProduct.categories , 
      quantityAvailable: prismaProduct.quantityAvailable,  
      discount: prismaProduct.discount,  
      attributes: prismaProduct.attributes ,
      shippingInfo: prismaProduct.shippingInfo , 
      status: prismaProduct.status, 
      sku: prismaProduct.sku ,  
      brand: prismaProduct.brand , 
      averageRating: prismaProduct.averageRating,  
      tags: prismaProduct.tags , 
    });
  }
}
