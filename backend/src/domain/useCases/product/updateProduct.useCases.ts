import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';
import { CategoriesDuplicatedError, CategoriesNotFoundError, DuplicateImagesError, ImagesNotFoundError, InvalidPriceFormatError, InvalidStockAmountError, MinLengthError, MissingRequiredFieldsError, ProductNotFoundError, TagsDuplicatedError, TagsNotFoundError } from '../../../errors/errors';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    
    const product:Product|null = await this.productRepository.findById(input.productId)
    
    if (!product) {
      throw new ProductNotFoundError();
    }
    this.validateInput(input);

   if(input.name) product.name = input.name
   if(input.description) product.description = input.description
   if(input.amount) product.amount = input.amount
   if(input.quantityAvailable) product.quantityAvailable = input.quantityAvailable
   if(input.discount) product.discount = input.discount
   if(input.status) product.status = input.status
   if(input.sku) product.sku = input.sku
   if(input.brand) product.brand = input.brand
   if(input.addTags){

    let tagsNotRepeated  = input.addTags.filter((tag: string) => !product.tags.includes(tag))
    if(tagsNotRepeated.length === 0) throw new TagsDuplicatedError()
    product.tags.push(...tagsNotRepeated)

   } 
   if(input.removeTags){

    let tagsToRemove = input.removeTags.filter((tag: string) => product.tags.includes(tag));
    if(tagsToRemove.length === 0) throw new TagsNotFoundError()
    product.tags = product.tags.filter((tag: string) => !tagsToRemove.includes(tag));
   }
   if(input.addImage){

    let imagesNotRepeated  = input.addImage.filter((image: string) => !product.images.includes(image))
    if(imagesNotRepeated.length === 0) throw new DuplicateImagesError()
    product.images.push(...imagesNotRepeated)

   }
   if(input.removeImage){
    let imagesToRemove = input.removeImage.filter((image: string) => product.images.includes(image));
    if(imagesToRemove.length === 0) throw new ImagesNotFoundError()
    product.images = product.images.filter((image: string) => !imagesToRemove.includes(image));
   }
   if(input.addCategories){
    let categoriesNotRepeated  = input.addCategories.filter((categorie: string) => !product.categories.includes(categorie))
    if(categoriesNotRepeated.length === 0) throw new CategoriesDuplicatedError()
    product.categories.push(...categoriesNotRepeated)
   }
   if(input.removeCategories){

    let categoriesToRemove = input.removeCategories.filter((categorie: string) => product.categories.includes(categorie));
    if(categoriesToRemove.length === 0) throw new CategoriesNotFoundError()
    product.categories = product.categories.filter((categorie: string) => !categoriesToRemove.includes(categorie));
   }

    const productUpdated:Product = await this.productRepository.update(product)

    
    return productUpdated.toDTO();
  }

  private validateInput(input: UpdateProductInput) {
    // Adicione aqui suas validações específicas para os dados de entrada, se necessário
    if(!input.productId || !input.userId || !input.storeId){
      throw new MissingRequiredFieldsError()
    }
    if (input.price && input.price < 0) {
      throw new InvalidPriceFormatError();
    }
    if (input.amount && input.amount < 0) {
      throw new InvalidStockAmountError();
    }
    if (input.name  && input.name.trim() === "") {
      throw new MinLengthError("name",2);
    }
    if (input.description && input.description.trim() ==="") {
      throw new MinLengthError("description",15);
    }

  }
}

type UpdateProductInput = {
  productId:string
  userId:string
  storeId:string
  name?: string
  description?: string
  price?: number
  amount?: number
  addImage?: string[];
  removeImage?: string[];
  addCategories?: string[];
  removeCategories?: string[];
  quantityAvailable?: number;
  discount?: number;
  status?: 'active' | 'inactive' | 'soldOut';
  sku?: string; 
  brand?: string;
  addTags?: string[];
  removeTags?: string[];
};

type UpdateProductOutput = {
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
