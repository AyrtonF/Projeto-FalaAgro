import { Router } from 'express';
import { AccessRepositoryPrisma } from '../data/repositoriesPrisma/access.repository.prisma';
import { CreateAccessUseCase } from '../domain/useCases/access/createAccess.useCase';
import { GetAllAccessUseCase } from '../domain/useCases/access/getAllAccess.useCase';
import { AccessController } from '../interface/controllers/access.controller';


const accessRouter = Router();

const accessRepository = new AccessRepositoryPrisma();


const createAccessUseCase = new CreateAccessUseCase(accessRepository);
const getAllAccessUseCase = new GetAllAccessUseCase(accessRepository)

const accessController = new AccessController({
    createAccessUseCase,
    getAllAccessUseCase,
});

accessRouter.post('/access', (request, response) => accessController.createAccess(request, response));
accessRouter.get('/access', (request, response) => accessController.getAllAccess(request, response));

export {accessRouter};
