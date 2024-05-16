import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(query?: ListProductQuery): Promise<Product[]> {
    // Se não houver query, listar todos os produtos
    if (!query) {
      return await this.listAllProducts();
    }

    // Se uma query válida for fornecida, processar a lista conforme a query
    if (query.category) {
      return await this.listProductsByCategory(query.category);
    }

    // Se nenhuma opção válida for fornecida, retornar uma lista vazia
    return [];
  }

  private async listAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }

  private async listProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productRepository.findByCategory(category);
    return products;
  }
}

type ListProductQuery = {
  category?: string;
};
