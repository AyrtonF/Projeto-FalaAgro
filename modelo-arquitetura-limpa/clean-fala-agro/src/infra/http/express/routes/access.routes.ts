import { Router } from 'express';
import { AccessRepositoryPrisma } from '../../../../data/repositoriesPrisma/access.repository.prisma';
import { CreateAccessUseCase } from '../../../../domain/useCases/access/createAccess.useCase';
import { AccessController } from '../../../../interface/controllers/access.controller';


const accessRouter = Router();
const accessRepository = new AccessRepositoryPrisma();
const createAccessUseCase = new CreateAccessUseCase(accessRepository);
const accessController = new AccessController({createAccessUseCase});

accessRouter.post('/access', (request, response) => accessController.createAccess(request, response));

export {accessRouter};
