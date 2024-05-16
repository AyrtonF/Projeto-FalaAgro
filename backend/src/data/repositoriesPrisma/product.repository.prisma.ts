import { Product } from "../../domain/models/product.model";
import { prisma } from "../prisma";
import { ProductRepositoryInterface } from "../repositories/product.repository.interface";

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
  async doesProductExist(id?: string, name?: string): Promise<boolean> {
    try {
      let product;
      if (id) {
        product = await prisma.product.findUnique({ where: { id } });
      } else if (name) {
        product = await prisma.product.findUnique({ where: { name } });
      } else {
        throw new Error("Missing identifier");
      }

      return !!product;
    } catch (error) {
      throw new Error("Erro interno durante a verificação do id ou nome");
    }
  }

  async insert(product: Product): Promise<Product> {
    try {
      const prismaProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
          createdAt: product.createdAt || undefined,
          updatedAt: product.updatedAt || undefined,
        },
      });

      return new Product({
        id: prismaProduct.id,
        name: prismaProduct.name,
        description: prismaProduct.description,
        price: prismaProduct.price,
        categoryId: prismaProduct.categoryId,
        createdAt: prismaProduct.createdAt,
        updatedAt: prismaProduct.updatedAt,
      });
    } catch (error) {
      throw new Error("Erro na criação do novo produto");
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const productFromPrisma = await prisma.product.findUnique({
        where: { id },
      });

      if (!productFromPrisma) {
        return null;
      }

      return this.mapPrismaProductToDomain(productFromPrisma);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find product by ID: ${error.message}`);
      } else {
        throw new Error("Erro interno no servidor ao buscar um id");
      }
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const productsFromPrisma = await prisma.product.findMany();

      return productsFromPrisma.map((productFromPrisma) =>
        this.mapPrismaProductToDomain(productFromPrisma)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const updatedProductFromPrisma = await prisma.product.update({
        where: { id: product.id },
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
          updatedAt: new Date(),
        },
      });

      return this.mapPrismaProductToDomain(updatedProductFromPrisma);
    } catch (error) {
      throw new Error("Erro na atualização do produto");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({ where: { id } });
      const product = await prisma.product.findUnique({ where: { id } });
      return product == null;
    } catch (error) {
      throw new Error("Erro ao deletar o produto");
    }
  }

  private mapPrismaProductToDomain(prismaProduct: any): Product {
    return new Product({
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: prismaProduct.price,
      categoryId: prismaProduct.categoryId,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
    });
  }
}
