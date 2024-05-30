import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';


export class GetProductShowCaseUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<GetProductShowCaseOutput> {
    const products: Product[] = await this.productRepository.findAll();
    return products.map(product => {
      const {   
       
        amount,
        quantityAvailable,
        discount,
        attributes,
        shippingInfo,
        status,
        sku,
        brand,
        vendor,
        averageRating,
        tags,
        createdAt,
        updatedAt, ...rest } = product.toJSON();
      return rest;
    });
  }
}

type  GetProductShowCaseOutput = {
  id: string;
 
  name: string;
  
  description: string;
  price: number;
  images:string[]
  categories: string[];

}[]
