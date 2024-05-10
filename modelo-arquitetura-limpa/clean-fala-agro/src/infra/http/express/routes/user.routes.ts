import { Router } from 'express';
import { CreateUserController } from '../../../../interface/controllers/user/createUser.controller';
import { CreateUserUseCase } from '../../../../domain/use-cases/user/createUser.useCase';
import { UserRepositoryPrisma } from '../../../../data/repositoriesPrisma/user.repository.prisma';
import { GetAllUserUseCase } from '../../../../domain/use-cases/user/getAllUser.useCase';
import { GetAllUserController } from '../../../../interface/controllers/user/getAllUser.controller';


const userRouter = Router();
const userRepository = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase);
const getAllUserController = new GetAllUserController(getAllUserUseCase);

userRouter.post('/user', (request, response) => createUserController.handle(request, response));
userRouter.get('/user',(request,response)=> getAllUserController.handle(request, response))
export { userRouter };
