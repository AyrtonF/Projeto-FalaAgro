import { Router } from 'express';
import { SaleRepositoryPrisma } from '../data/repositoriesPrisma/sale.repository.prisma';
import { ProductRepositoryPrisma } from '../data/repositoriesPrisma/product.repository.prisma';
import { CreateSaleUseCase } from '../domain/useCases/sales/createSale.useCase';
import { SaleController } from '../interface/controllers/sale.controller';


const saleRoute = Router()


const saleRepository = new SaleRepositoryPrisma()
const productRepository= new ProductRepositoryPrisma()


const createSaleUseCase = new CreateSaleUseCase(productRepository,saleRepository)



const saleController = new SaleController({createSaleUseCase})

saleRoute.post('/sale', (request, response) => saleController.createSale(request, response));

export {saleRoute}