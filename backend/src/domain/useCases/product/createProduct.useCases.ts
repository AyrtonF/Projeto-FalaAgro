import { ProductRepositoryInterface } from "../../../data/repositories/product.repository.interface";
import {DuplicateProductNameError, MissingRequiredFieldsError } from "../../../errors/errors";
import { Product } from "../../models/product.model";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const isDuplicateProductNameInStore  = await this.productRepository.isDuplicateProductNameInStore ({
      name:input.name,
      storeId:input.storeId}
    );
    if (isDuplicateProductNameInStore) {
      throw new DuplicateProductNameError;
    }

    this.validateInput(input);

    const product = await this.productRepository.insert(new Product(input));

    return product.toDTO();
  }

  private validateInput(input: CreateProductInput) {
    if (
      !input.name ||
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
  price: number;
  amount: number;
  name: string;
  description?: string;
  categories?: string[];
  images?: string[];
  quantityAvailable?: number;
  createdAt?: Date;
  updatedAt?: Date;
  discount?: number; 
  attributes?: { [key: string]: string }; 
  shippingInfo?: {
    weight?: number; 
    dimensions?: { length: number; width: number; height: number }; 
    shippingCost?: number; 
  };
  status?: 'active' | 'inactive' | 'soldOut'; 
  sku?: string; 
  brand?: string;
  vendor?: {
    vendorId: string;
    name: string;
  };
  averageRating?: number; 
  tags?: string[]; 
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
  discount?: number;
  attributes?: { [key: string]: string }; 
  shippingInfo?: {
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
    shippingCost?: number; 
  };
  status?: 'active' | 'inactive' | 'soldOut';
  sku?: string; 
  brand?: string;
  vendor?: {
    vendorId: string;
    name: string;
  };
  averageRating?: number; 
  tags?: string[]; 
};
