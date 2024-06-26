import { Router } from 'express';
import { SaleRepositoryPrisma } from '../data/repositoriesPrisma/sale.repository.prisma';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { CreateSaleUseCase } from '../domain/useCases/sales/createSale.useCase';
import { GetAllSaleUseCase } from '../domain/useCases/sales/getAllSale.useCase';
import { GetSaleByIdUseCase } from '../domain/useCases/sales/getSaleById.useCase';
import { GetSaleByUserIdUseCase } from '../domain/useCases/sales/getSaleByUserId.useCase';
import { ConfirmBuyerForSaleUseCase } from '../domain/useCases/sales/confirmBuyerForSale.useCase';
import { ConfirmSellerForSaleUseCase } from '../domain/useCases/sales/confirmSellerForSale.useCase';
import { DeleteSaleUseCase } from '../domain/useCases/sales/deleteSale.useCase';
import { SaleController } from '../interface/controllers/sale.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const saleRoute = Router()


const saleRepository = new SaleRepositoryPrisma()
const productRepository= new ProductRepositoryPrisma()
const storeRepository = new StoreRepositoryPrisma()

const createSaleUseCase = new CreateSaleUseCase(productRepository,saleRepository,storeRepository)
const getAllSaleUseCase = new GetAllSaleUseCase(saleRepository)
const getSaleByIdUseCase = new GetSaleByIdUseCase(saleRepository)
const getSaleByUserIdUseCase = new GetSaleByUserIdUseCase(saleRepository)
const confirmBuyerForSaleUseCase = new ConfirmBuyerForSaleUseCase(saleRepository)
const confirmSellerForSaleUseCase = new ConfirmSellerForSaleUseCase(saleRepository) 
const deleteSaleUseCase = new DeleteSaleUseCase(saleRepository)

const saleController = new SaleController({createSaleUseCase,getAllSaleUseCase,getSaleByIdUseCase,getSaleByUserIdUseCase,confirmBuyerForSaleUseCase,confirmSellerForSaleUseCase,deleteSaleUseCase})

saleRoute.post('/sale',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.createSale(request, response));
saleRoute.get('/sale-all',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.getAllSales(request, response));
saleRoute.get('/sale',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.getSaleById(request, response));
saleRoute.get('/sale-buyerId',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.getSaleByBuyerId(request, response));
saleRoute.get('/sale-sellerId',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.getSaleBySellerId(request, response));
saleRoute.put('/sale-buyer-confirm',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.confirmBuyerForSale(request, response));
saleRoute.put('/sale-seller-confirm',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.confirmSellerForSale(request, response));
saleRoute.delete('/sale',authMiddleware(['VENDEDOR',"COMPRADOR","ADMIN"]), (request, response) => saleController.deleteSale(request, response));
export {saleRoute}