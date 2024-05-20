import { Router } from 'express';
import { StoreRepositoryPrisma } from '../data/repositoriesPrisma/store.repository.prisma';
import { UserRepositoryPrisma } from '../data/repositoriesPrisma/user.repository.prisma';
import { CreateStoreUseCase } from '../domain/useCases/store/createStore.useCase';
import { GetStoreByIdUseCase } from '../domain/useCases/store/getStoreById.useCase';
import { GetAllStoreUseCase } from '../domain/useCases/store/getAllStore.useCase';
import { UpdateStoreUseCase } from '../domain/useCases/store/updateStore.useCase';
import { DeleteStoreUseCase } from '../domain/useCases/store/deleteStore.useCase';
import { StoreController } from '../interface/controllers/store.controller';
import { authMiddleware } from '../middlewares/AuthMiddleware';
const storeRouter = Router();


const storeRepository = new StoreRepositoryPrisma();
const userRepository = new UserRepositoryPrisma()

const createStoreUseCase = new CreateStoreUseCase(storeRepository, userRepository);
const getStoreByIdUseCase = new GetStoreByIdUseCase(storeRepository)
const getAllStoreUseCase = new GetAllStoreUseCase(storeRepository)
const updateStoreUseCase = new UpdateStoreUseCase(storeRepository)
const deleteStoreUseCase = new DeleteStoreUseCase(storeRepository)

const storeController = new StoreController({
    createStoreUseCase,
    getStoreByIdUseCase,
    getAllStoreUseCase,
    updateStoreUseCase,
    deleteStoreUseCase
    
});

storeRouter.post('/store',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.createStore(request, response));
storeRouter.get('/store/:storeId',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.getStoreById(request, response));
storeRouter.get('/store/',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.getAllStore(request, response));
storeRouter.put('/store',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.updateStore(request, response));
storeRouter.delete('/store/:storeId',authMiddleware(['Vendedor',"Admin"]), (request, response) => storeController.deleteStore(request, response));

export {storeRouter};
