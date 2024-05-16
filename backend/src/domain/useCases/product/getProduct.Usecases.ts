import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';
import { MissingRequiredFieldsError, ProductNotFoundError, UserNotLoggedInError } from '../../../errors/product.error';
import { Product } from '../../models/product.model';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: GetProductInput): Promise<GetProductOutput> {
    // Verificar se uma query válida foi fornecida
    if (!input.storeId) {
      throw new UserNotLoggedInError();
    }
  
    // Buscar produto pelo ID, se fornecido
    if (input.id) {
     const product:Product|null = await this.productRepository.findById(input.id)
      if(product){
        return product.toDTO()
      }
      throw new ProductNotFoundError();
    }
    // Buscar produto pelo nome, se fornecido
    if (input.name) {
          const product:Product|null = await this.productRepository.findByName(input.name, input.storeId);
          if(product){
              return product.toDTO()
          }
            throw new ProductNotFoundError();
          }
     throw new MissingRequiredFieldsError();
    }
   
}
 

  

type GetProductInput = {
  storeId: string;
  id?: string;
  name?: string 
};

type GetProductOutput = {
  id: string;
  storeId: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  amount: number;
  categories: string[];
  quantityAvailable: number;
};
