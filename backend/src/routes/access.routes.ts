import { Router } from 'express';
import { AccessRepositoryPrisma } from '../data/repositoriesPrisma/access.repository.prisma';
import { CreateAccessUseCase } from '../domain/useCases/access/createAccess.useCase';
import { GetAllAccessUseCase } from '../domain/useCases/access/getAllAccess.useCase';
import { AccessController } from '../interface/controllers/access.controller';
import { UpdateNameAccessUseCase } from '../domain/useCases/access/updateNameAccess.useCase';

const accessRouter = Router();

const accessRepository = new AccessRepositoryPrisma();


const createAccessUseCase = new CreateAccessUseCase(accessRepository);
const getAllAccessUseCase = new GetAllAccessUseCase(accessRepository)
const updateNameAccessUseCase = new UpdateNameAccessUseCase(accessRepository)

const accessController = new AccessController({
    createAccessUseCase,
    getAllAccessUseCase,
    updateNameAccessUseCase,
});

accessRouter.post('/access', (request, response) => accessController.createAccess(request, response));
accessRouter.get('/access', (request, response) => accessController.getAllAccess(request, response));
accessRouter.put('/access/:id', (request, response) => accessController.updateNameAccess(request, response));
export {accessRouter};
