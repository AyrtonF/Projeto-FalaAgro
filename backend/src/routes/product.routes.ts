import { Router } from 'express';
import { CreateProductUseCase } from '../domain/useCases/product/createProductUseCase';
import { GetAllProductsUseCase } from '../domain/useCases/product/getAllProductsUseCase';
import { UpdateProductPriceUseCase } from '../domain/useCases/product/updateProductPriceUseCase';
import { UpdateProductNameUseCase } from '../domain/useCases/product/updateProductNameUseCase';
import { DeleteProductUseCase } from '../domain/useCases/product/deleteProductUseCase';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { ProductController } from '../interface/controllers/product.controller';

const productRouter = Router();
const productRepository = new ProductRepositoryPrisma();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const updateProductPriceUseCase = new UpdateProductPriceUseCase(productRepository);
const updateProductNameUseCase = new UpdateProductNameUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const productController = new ProductController(
    createProductUseCase,
    getAllProductsUseCase,
    updateProductPriceUseCase,
    updateProductNameUseCase,
    deleteProductUseCase
);

productRouter.post('/product', (request, response) => productController.createProduct(request, response));
productRouter.get('/product', (request, response) => productController.getAllProducts(request, response));
productRouter.put('/product/:productId/price', (request, response) => productController.updateProductPrice(request, response));
productRouter.put('/product/:productId/name', (request, response) => productController.updateProductName(request, response));
productRouter.delete('/product/:productId', (request, response) => productController.deleteProduct(request, response));

export { productRouter };
