import { Router } from 'express';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { UserRepositoryPrisma } from '../data/repositoriesPrisma/user.repository.prisma';
import { CreateStoreUseCase } from '../domain/useCases/store/createStore.useCase';
import { GetStoreByIdUseCase } from '../domain/useCases/store/getStoreById.useCase';
import { GetAllStoreUseCase } from '../domain/useCases/store/getAllStore.useCase';
import { StoreController } from '../interface/controllers/store.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';
const storeRouter = Router();


const storeRepository = new StoreRepositoryPrisma();
const userRepository = new UserRepositoryPrisma()

const createStoreUseCase = new CreateStoreUseCase(storeRepository, userRepository);
const getStoreByIdUseCase = new GetStoreByIdUseCase(storeRepository)
const getAllStoreUseCase = new GetAllStoreUseCase(storeRepository)

const storeController = new StoreController({
    createStoreUseCase,
    getStoreByIdUseCase,
    getAllStoreUseCase,
});

storeRouter.post('/store',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.createStore(request, response));
storeRouter.get('/store/:storeId',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.getStoreById(request, response));
storeRouter.get('/store/',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.getAllStore(request, response));

export {storeRouter};
