import { ProductRepositoryInterface } from "../../../data/repositories/product.repository.interface";
import { DuplicateIdError, DuplicateProductNameError, MissingRequiredFieldsError } from "../../../errors/Product.error";
import { Product } from "../../models/product.model";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const existingProduct = await this.productRepository.findByName(
      input.name,
      input.storeId
    );
    if (existingProduct) {
      throw new DuplicateProductNameError();
    }

    this.validateInput(input);

    const product = await this.productRepository.insert(new Product(input));

    return product.toDTO();
  }

  private validateInput(input: CreateProductInput) {
    if (
      !input.name ||
      !input.description ||
      !input.categories ||
      !input.price ||
      !input.amount ||
      !input.storeId 
      
     
    ) {
     throw new MissingRequiredFieldsError();
    }
  }
}

type CreateProductInput = {
  storeId: string;
  description: string;
  price: number;
  amount: number;
  name: string;
  images?: string[];
  categories?: string[];
  quantityAvailable?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateProductOutput = {
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
