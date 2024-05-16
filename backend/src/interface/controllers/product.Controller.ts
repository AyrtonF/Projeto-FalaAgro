import { Request, Response } from "express";
import { CreateProductUseCase } from "../../domain/useCases/product/createProductUseCase";
import { GetAllProductsUseCase } from "../../domain/useCases/product/getAllProductsUseCase";
import { UpdateProductPriceUseCase } from "../../domain/useCases/product/updateProductPriceUseCase";
import { UpdateProductNameUseCase } from "../../domain/useCases/product/updateProductNameUseCase";
import { DeleteProductUseCase } from "../../domain/useCases/product/deleteProductUseCase";
import { Product } from "../../domain/models/Product.model";

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getAllProductsUseCase: GetAllProductsUseCase,
    private updateProductPriceUseCase: UpdateProductPriceUseCase,
    private updateProductNameUseCase: UpdateProductNameUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async createProduct(request: Request, response: Response): Promise<Response> {
    try {
      const { name, price, category } = request.body;
      const product = await this.createProductUseCase.execute({
        name,
        price,
        category,
      });
      return response.status(201).json(product);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllProducts(
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
  }
}
