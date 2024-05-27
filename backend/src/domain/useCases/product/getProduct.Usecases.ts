import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';
import { MissingRequiredFieldsError, ProductNotFoundError, UserNotLoggedInError } from '../../../errors/errors';
import { Product } from '../../models/product.model';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: GetProductInput): Promise<GetProductOutput> {
  
    this.validateInput(input)
   
    if (input.productId) {
     const product:Product|null = await this.productRepository.findById(input.productId)
      if(product){
        return product.toDTO()
      }
      throw new ProductNotFoundError();
    }
    
    if (input.productName) {
          const product:Product|null = await this.productRepository.findByName({name:input.productName, storeId:input.storeId});
          if(product){
              return product.toDTO()
          }
            throw new ProductNotFoundError();
          }
     throw new MissingRequiredFieldsError()
     
    }

    private validateInput(input: GetProductInput) {
      if (!input.storeId || ((!input.productName) && (!input.productId))) {
       throw new MissingRequiredFieldsError();
      }
}
 

}  

type GetProductInput = {
  storeId: string;
  productId?: string;
  productName?: string 
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
