import { Product } from "../../domain/models/product.model";

export interface ProductRepositoryInterface {
  insert(product: Product): Promise<Product>;

  findById(id: string): Promise<Product | null>;

  findByName({name,storeId}:{name: string, storeId:string}): Promise<Product | null>;

  isDuplicateProductNameInStore ({name,storeId}:{name: string, storeId:string}):Promise<boolean>;
  
  findAll(): Promise<Product[]>;

  update(product: Product): Promise<Product>;

  delete(id: string, storeId:string): Promise<boolean>;
}
