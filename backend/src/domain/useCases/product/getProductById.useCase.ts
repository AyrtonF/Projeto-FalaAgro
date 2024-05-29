import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';
import { MissingRequiredFieldsError, ProductNotFoundError, UserNotLoggedInError } from '../../../errors/errors';
import { Product } from '../../models/product.model';

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: GetProductInput): Promise<GetProductOutput> {
  
    this.validateInput(input)
     const product:Product|null = await this.productRepository.findById(input.productId)
      if(!product){
        throw new ProductNotFoundError();
        
      }
      
      return product.toDTO()
    
     
    }

    private validateInput(input: GetProductInput) {
      if (!input.productId) {
       throw new MissingRequiredFieldsError();
      }
}
 

}  

type GetProductInput = {
  productId: string;

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
