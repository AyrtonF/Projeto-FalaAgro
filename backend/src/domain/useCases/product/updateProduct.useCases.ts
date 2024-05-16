import { ProductRepositoryInterface } from './../../../data/repositories/product.repository.interface';
import { Product } from '../../models/product.model';
import { InvalidPriceFormatError, InvalidStockAmountError, MinLengthError, MissingRequiredFieldsError, ProductNotFoundError } from '../../../errors/Product.error';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    
    const existingProduct:Product|null = await this.productRepository.findById(input.id)
    
    if (!existingProduct) {
      throw new ProductNotFoundError();
    }

    // Validar dados de entrada
    this.validateInput(input);

    // Atualizar as propriedades do produto existente
    const updatedProduct = new Product({
      ...existingProduct.toJSON(),
      ...input,
    });

    // Atualizar o produto no repositório
  const productUpdated =  await this.productRepository.update(updatedProduct);

    // Retornar o produto atualizado no formato JSON
    return productUpdated.toDTO();
  }

  private validateInput(input: UpdateProductInput) {
    // Adicione aqui suas validações específicas para os dados de entrada, se necessário
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
    if(!input.description && !input.price && !input.name && !input.description){
      throw new MissingRequiredFieldsError();
    }
    
  }
}

type UpdateProductInput = {
  id:string
  userId:string
  storeId:string
  name?: string
  description?: string
  price?: number
  amount?: number
  images: string[];
};

type UpdateProductOutput = {
  id: string;
  storeId: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  amount: number;
  quantityAvailable: number;
};


/*  
  
  name: string;
  images?: string[];
  description: string;
  price: number;
  amount: number;
  categories?: string[];

  
  */ 

