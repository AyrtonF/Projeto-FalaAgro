import { Router } from 'express';
import multer from 'multer';
import { CreateProductUseCase } from '../domain/useCases/product/createProduct.useCases';
import { DeleteProductUseCase } from '../domain/useCases/product/deleteProduct.useCases';
import { GetAllProductUseCase } from '../domain/useCases/product/getAllProduct.useCases';
import { GetProductUseCase } from '../domain/useCases/product/getProduct.Usecases';
import { GetProductByIdUseCase } from '../domain/useCases/product/getProductById.useCase';
import { GetProductShowCaseUseCase } from '../domain/useCases/product/getProductShowCase.useCase';
import { UpdateProductUseCase } from '../domain/useCases/product/updateProduct.useCases';
import { DeleteAllProductUseCase } from '../domain/useCases/product/deleteAllProduct.useCase';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { ProductController } from '../interface/controllers/product.Controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';
const productRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });
const productRepository = new ProductRepositoryPrisma();
const storeRepository = new StoreRepositoryPrisma()

const createProductUseCase = new CreateProductUseCase(productRepository,storeRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository)
const getProductUseCase = new GetProductUseCase(productRepository)
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)
const getAllProductUseCase = new GetAllProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository, storeRepository)
const deleteAllProductUseCase = new DeleteAllProductUseCase(productRepository)
const getProductShowCaseUseCase =  new GetProductShowCaseUseCase(productRepository)
const productController = new ProductController({
    createProductUseCase,
    getProductUseCase,
    getAllProductUseCase,
    deleteProductUseCase,
    updateProductUseCase,
    deleteAllProductUseCase,
    getProductByIdUseCase,
    getProductShowCaseUseCase,
   });


productRouter.post('/product', upload.array('images', 10), (request, response) => productController.createProduct(request, response));
productRouter.post('/product-cascate', (request, response) => productController.createProductCascate(request, response));

productRouter.get('/product-in-store', (request, response) => productController.getProductByIdOrByNameInStore(request, response));
productRouter.get('/product/featered/', (request, response) => productController.getAllProducts(request, response,true));
productRouter.get('/product/:productId/', (request, response) => productController.getProductById(request, response));
productRouter.get('/product-all/', (request, response) => productController.getAllProducts(request, response));
productRouter.put('/product/',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => productController.updateProduct(request, response));
productRouter.delete('/product/',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => productController.deleteProduct(request, response)); 
productRouter.delete('/product-all/',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => productController.deleteProductAll(request, response)); 

export { productRouter };




