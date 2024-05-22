import { Request, Response } from "express";
import { CreateProductUseCase } from "../../domain/useCases/product/createProduct.useCases";
import { DeleteProductUseCase } from "../../domain/useCases/product/deleteProduct.useCases";
import { GetProductUseCase } from "../../domain/useCases/product/getProduct.Usecases";
import { GetAllProductUseCase } from "../../domain/useCases/product/getAllProduct.useCases";
import { UpdateProductUseCase } from "../../domain/useCases/product/updateProduct.useCases";
import { Product } from "../../domain/models/product.model";
import { handleErrors } from "../../errors/hadler.errors";
import { InternalServerError } from "../../errors/errors";

type productControllerInput = {
  createProductUseCase: CreateProductUseCase,
  getProductUseCase: GetProductUseCase,
  getAllProductUseCase: GetAllProductUseCase,
  deleteProductUseCase: DeleteProductUseCase,
  updateProductUseCase: UpdateProductUseCase,
}
export class ProductController {
  constructor(
    private input:productControllerInput
   
  ) {}

  async createProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { storeId,price,amount,name } = request.body;

      const product = await this.input.createProductUseCase.execute({
        storeId,
        price,
        amount,
        name,
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

  /* async getAllProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const products = await this.getAllProductsUseCase.execute();
      return response.status(200).json(products);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProductPrice(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { productId } = request.params;
      const { price } = request.body;
      const updatedProduct = await this.updateProductPriceUseCase.execute(
        productId,
        price
      );
      return response.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProductName(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { productId } = request.params;
      const { name } = request.body;
      const updatedProduct = await this.updateProductNameUseCase.execute(
        productId,
        name
      );
      return response.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { productId } = request.params;
      const isDeleted = await this.deleteProductUseCase.execute(productId);
      return response
        .status(200)
        .json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  } */
}
