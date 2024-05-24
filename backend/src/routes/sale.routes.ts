import { Router } from 'express';
import { SaleRepositoryPrisma } from '../data/repositoriesPrisma/sale.repository.prisma';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { CreateSaleUseCase } from '../domain/useCases/sales/createSale.useCase';
import { GetAllSaleUseCase } from '../domain/useCases/sales/getAllSale.useCase';
import { GetSaleByIdUseCase } from '../domain/useCases/sales/getSaleById.useCase';
import { SaleController } from '../interface/controllers/sale.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const saleRoute = Router()


const saleRepository = new SaleRepositoryPrisma()
const productRepository= new ProductRepositoryPrisma()


const createSaleUseCase = new CreateSaleUseCase(productRepository,saleRepository)
const getAllSaleUseCase = new GetAllSaleUseCase(saleRepository)
const getSaleByIdUseCase = new GetSaleByIdUseCase(saleRepository)

const saleController = new SaleController({createSaleUseCase,getAllSaleUseCase,getSaleByIdUseCase})

saleRoute.post('/sale',authMiddleware(['Admin','Vendedor','Comprador']), (request, response) => saleController.createSale(request, response));
saleRoute.get('/sale-all',authMiddleware(['Admin','Vendedor','Comprador']), (request, response) => saleController.getAllSales(request, response));
saleRoute.get('/sale',authMiddleware(['Admin','Vendedor','Comprador']), (request, response) => saleController.getSaleById(request, response));
export {saleRoute}