import { Router } from 'express';
import { CreateProductUseCase } from '../domain/useCases/product/createProduct.useCases';
import { DeleteProductUseCase } from '../domain/useCases/product/deleteProduct.useCases';
import { GetAllProductUseCase } from '../domain/useCases/product/getAllProduct.useCases';
import { GetProductUseCase } from '../domain/useCases/product/getProduct.Usecases';
import { UpdateProductUseCase } from '../domain/useCases/product/updateProduct.useCases';
import { DeleteAllProductUseCase } from '../domain/useCases/product/deleteAllProduct.useCase';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { ProductController } from '../interface/controllers/product.Controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';
const productRouter = Router();

const productRepository = new ProductRepositoryPrisma();
const storeRepositoryPrisma = new StoreRepositoryPrisma()

const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository)
const getProductUseCase = new GetProductUseCase(productRepository)
const getAllProductUseCase = new GetAllProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository, storeRepositoryPrisma)
const deleteAllProductUseCase = new DeleteAllProductUseCase(productRepository)

const productController = new ProductController({
    createProductUseCase,
    getProductUseCase,
    getAllProductUseCase,
    deleteProductUseCase,
    updateProductUseCase,
    deleteAllProductUseCase,
   });

productRouter.post('/product', (request, response) => productController.createProduct(request, response));
productRouter.post('/product-cascate', (request, response) => productController.createProductCascate(request, response));

productRouter.get('/product', (request, response) => productController.getProduct(request, response));
productRouter.get('/product-all', (request, response) => productController.getAllProducts(request, response));
productRouter.put('/product/',authMiddleware(['Vendedor','Comprador',"Admin"]), (request, response) => productController.updateProduct(request, response));
productRouter.delete('/product/',authMiddleware(['Vendedor','Comprador',"Admin"]), (request, response) => productController.deleteProduct(request, response)); 
productRouter.delete('/product-all/',authMiddleware(['Vendedor','Comprador',"Admin"]), (request, response) => productController.deleteProductAll(request, response)); 

export { productRouter };


