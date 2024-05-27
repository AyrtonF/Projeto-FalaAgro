import { Request, Response } from "express";
import { CreateProductUseCase } from "../../domain/useCases/product/createProduct.useCases";
import { DeleteProductUseCase } from "../../domain/useCases/product/deleteProduct.useCases";
import { GetProductUseCase } from "../../domain/useCases/product/getProduct.Usecases";
import { GetAllProductUseCase } from "../../domain/useCases/product/getAllProduct.useCases";
import { UpdateProductUseCase } from "../../domain/useCases/product/updateProduct.useCases";
import { DeleteAllProductUseCase } from "../../domain/useCases/product/deleteAllProduct.useCase";
import { Product } from "../../domain/models/product.model";
import { handleErrors } from "../../errors/hadler.errors";
import { InternalServerError } from "../../errors/errors";

type productControllerInput = {
  createProductUseCase: CreateProductUseCase,
  getProductUseCase: GetProductUseCase,
  getAllProductUseCase: GetAllProductUseCase,
  deleteProductUseCase: DeleteProductUseCase,
  updateProductUseCase: UpdateProductUseCase,
  deleteAllProductUseCase: DeleteAllProductUseCase,
}
export class ProductController {
  constructor(
    private input:productControllerInput
   
  ) {}

  async createProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { storeId,price,amount,name,description } = request.body;

      const product = await this.input.createProductUseCase.execute({
        storeId,
        price,
        amount,
        name,
        description
      });
      return response.status(201).json(product);
    } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
  }
  async createProductCascate(request: Request, response: Response): Promise<Response> {
    try {
      let products:any = []
      const {productsRequest} = request.body
      productsRequest.map(async (productMap:any)=>{
        const { storeId,price,amount,name,description } = productMap
        const product = await this.input.createProductUseCase.execute({
          storeId,
          price,
          amount,
          name,
          description
        });
        products.push(product)
      })
      return response.status(201).json({products});
    } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
  }

  async getProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { storeId, productId, productName } = request.body;

      const product = await this.input.getProductUseCase.execute({storeId,productId,productName});
      return response.status(201).json(product);
    } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
  }
  async getAllProducts(request: Request, response: Response): Promise<Response> {
    try {

      const products = await this.input.getAllProductUseCase.execute();
      return response.status(201).json(products);
    } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
  }

  async updateProduct(request: Request, response: Response): Promise<Response> {
    try {
      const {id} = request.user
      const userId = id
      const { productId, storeId, name, description, price, amount, addImage, removeImage, addCategories, removeCategories, quantityAvailable, discount, status, sku, brand, addTags, removeTags } = request.body;

      const product = await this.input.updateProductUseCase.execute({
        productId,
        userId,
        storeId,
        name,
        description,
        price,
        amount,
        addImage,
        removeImage,
        addCategories,
        removeCategories,
        quantityAvailable,
        discount,
        status,
        sku, 
        brand,
        addTags,
        removeTags
      });
      return response.status(201).json(product);
    } catch (error: unknown) {
            if (error instanceof Error) {
                const errorResponse = handleErrors(error); 
                return response.status(errorResponse.status).json(errorResponse.message); 
            } else {
               throw new InternalServerError
            }
        }
  }

  async deleteProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { productId, storeId } = request.body;
      const {id} = request.user
      const isDeleted = await this.input.deleteProductUseCase.execute({productId,id,storeId});
      return response.status(201).json(isDeleted);
    } catch (error: unknown) {
      if (error instanceof Error) {
          const errorResponse = handleErrors(error); 
          return response.status(errorResponse.status).json(errorResponse.message); 
      } else {
         throw new InternalServerError
      }
  }
  }
  async deleteProductAll(request: Request, response: Response): Promise<Response> {
    try {
    
      const {id} = request.user
      const isDeleted = await this.input.deleteAllProductUseCase.execute().then(result => {
        console.log(result.message);
      })
      .catch(error => {
        console.error(error);
      });
      return response.status(201).json(isDeleted);
    } catch (error: unknown) {
      if (error instanceof Error) {
          const errorResponse = handleErrors(error); 
          return response.status(errorResponse.status).json(errorResponse.message); 
      } else {
         throw new InternalServerError
      }
  }
  }

 
}
