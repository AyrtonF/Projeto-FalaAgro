import { Router } from 'express';

import { AccessRepositoryPrisma } from '../../../../data/repositoriesPrisma/access.repository.prisma';
import { CreateAccessUseCase } from '../../../../domain/use-cases/access/createAccess.useCase';
import { CreateAccessController } from '../../../../interface/controllers/access/createAccess.controller';


const accessRouter = Router();
const accessRepository = new AccessRepositoryPrisma();
const createAccessUseCase = new CreateAccessUseCase(accessRepository);
const createAccessController = new CreateAccessController(createAccessUseCase);

accessRouter.post('/access', (request, response) => createAccessController.handle(request, response));

export {accessRouter };
