import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';

export class DeleteAllProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<DeleteProductOutput> {
    try {
      const deleted = await this.productRepository.deleteAll();
      const message = deleted ? "Todos os produtos foram deletados com sucesso." : "Nenhum produto foi deletado.";
      return { message };
    } catch (error) {
      console.error("Erro ao executar a exclusão de todos os produtos: ", error);
      throw new Error("Erro ao executar a exclusão de todos os produtos: " + (error instanceof Error ? error.message : ""));
    }
  }
}

type DeleteProductOutput = {
  message: string;
}
