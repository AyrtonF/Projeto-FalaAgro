import { Product } from "../../domain/models/product.model";

export interface ProductRepositoryInterface {
  insert(product: Product): Promise<Product>;

  findById(id: string): Promise<Product | null>;

  findByName(name: string, StoreId:string): Promise<Product | null>;

  findAll(): Promise<Product[]>;

  update(product: Product): Promise<Product>;

  updatePrice(id: string, price: number): Promise<Product>;

  updateName(id: string, name: string): Promise<Product>;

  delete(id: string, storeId:string): Promise<boolean>;
}
