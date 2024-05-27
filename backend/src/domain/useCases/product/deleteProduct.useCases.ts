import { ProductNotFoundError, UserNotOwnerError } from '../../../errors/errors';
import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';
import { StoreRepositoryInterface } from '../../../data/repositories/store.repository.inferface';

export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface, private storeRepository: StoreRepositoryInterface) {}

    async execute(input:DeleteProductInput): Promise<DeleteProductOutput> {
        
        const existingProduct = await this.productRepository.findById(input.productId);
        if (!existingProduct) {
            throw new ProductNotFoundError();
        }
        const isOwner:boolean   = await this.storeRepository.isUserOwnerOfStore({storeId:input.storeId,userId:input.id})
        if(!isOwner ){
           throw new UserNotOwnerError()
        }

        const deleted:boolean = await this.productRepository.delete(input.productId, input.storeId);
        const message:string = deleted ? "Produto deletado com sucesso":"Produto não deletado"
        
        return {message};
    }
}
type DeleteProductInput = {
    id:string
    productId: string, 
    storeId: string
}
type DeleteProductOutput = {
    message:string
}
