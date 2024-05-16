import { ProductNotFoundError } from '../../../errors/product.error';
import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';


export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input:DeleteProductInput): Promise<DeleteProductOutput> {
        // Verificar se o produto com o mesmo nome existe
        const existingProduct = await this.productRepository.findById(input.id);
        if (!existingProduct) {
            throw new ProductNotFoundError();
        }

        // Excluir o produto do repositório
        const deleted:boolean = await this.productRepository.delete(input.id, input.storeId);
        const message:string = deleted ? "Usuario deletado com sucesso":"Usuario não deletado"
        
        return {message};
    }
}
type DeleteProductInput = {
    id: string, 
    storeId: string
}
type DeleteProductOutput = {
    message:string
}
