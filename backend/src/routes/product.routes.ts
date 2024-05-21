import { Router } from 'express';
import { CreateProductUseCase } from '../domain/useCases/product/createProduct.useCases';
import { UpdateProductPriceUseCase } from '../domain/useCases/product/updtadeProductPrice.useCase';
import { UpdateProductNameUseCase } from '../domain/useCases/product/updateProductName.useCase';
import { DeleteProductUseCase } from '../domain/useCases/product/deleteProduct.useCases';
import { GetAllProductUseCase } from '../domain/useCases/product/getAllProduct.useCases';
import { GetProductUseCase } from '../domain/useCases/product/getProduct.Usecases';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { ProductController } from '../interface/controllers/product.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';
const productRouter = Router();


const productRepository = new ProductRepositoryPrisma();
const storeRepositoryPrisma = new StoreRepositoryPrisma()

const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository)
const getAllProductUseCase = new GetAllProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository, storeRepositoryPrisma)

const productController = new ProductController({
    createProductUseCase,
    getProductUseCase,
    getAllProductUseCase,
    deleteProductUseCase,
   });

productRouter.post('/product', (request, response) => productController.createProduct(request, response));
productRouter.get('/product', (request, response) => productController.getProduct(request, response));
productRouter.get('/product-all', (request, response) => productController.getAllProducts(request, response));
// productRouter.put('/product/:productId/price', (request, response) => productController.updateProductPrice(request, response));
// productRouter.put('/product/:productId/name', (request, response) => productController.updateProductName(request, response));
productRouter.delete('/product/',authMiddleware(['Vendedor','Comprador',"Admin"]), (request, response) => productController.deleteProduct(request, response)); 

export { productRouter };
