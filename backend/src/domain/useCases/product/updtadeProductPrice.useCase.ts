import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';
export class UpdateProductPriceUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(productId: string, newPrice: number): Promise<Product> {
    // Verificar se o produto existe
    const existingProduct = await this.productRepository.findById(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    // Atualizar o preço do produto
    existingProduct.price = newPrice;

    // Atualizar o produto no repositório
    const updatedProduct = await this.productRepository.update(existingProduct);

    // Retornar o produto atualizado
    return updatedProduct;
  }
}
