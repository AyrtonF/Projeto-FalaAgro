import { Router } from 'express';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { UserRepositoryPrisma } from '../data/repositoriesPrisma/user.repository.prisma';
import { CreateStoreUseCase } from '../domain/useCases/store/createStore.useCase';
import { StoreController } from '../interface/controllers/store.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';


const storeRouter = Router();

const storeRepository = new StoreRepositoryPrisma();
const userRepository = new UserRepositoryPrisma()

const createStoreUseCase = new CreateStoreUseCase(storeRepository, userRepository);


const storeController = new StoreController({
    createStoreUseCase,
    
});

storeRouter.post('/store',authMiddleware(['Vendedor']), (request, response) => storeController.createStore(request, response));

export {storeRouter};
