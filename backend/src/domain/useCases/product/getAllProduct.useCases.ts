import { ProductRepositoryInterface } from '../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';

export class GetAllProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<GetAllProductOutPut> {
    const products:Product[] = await this.productRepository.findAll()
    return products.map(product => product.toDTO())
  }



}

type GetAllProductOutPut = {
  id: string;
  storeId: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  amount: number;
  categories: string[];
  quantityAvailable: number;
}[]
