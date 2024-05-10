import { Router } from 'express';
import { CreateUserUseCase } from '../../../../domain/use-cases/user/createUser.useCase';
import { UserRepositoryPrisma } from '../../../../data/repositoriesPrisma/user.repository.prisma';
import { GetAllUserUseCase } from '../../../../domain/use-cases/user/getAllUser.useCase';
import { UserController } from '../../../../interface/controllers/user/user.controller';

const userRouter = Router();
const userRepository = new UserRepositoryPrisma();

const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository)

const userController = new UserController({createUserUseCase, getAllUserUseCase})

userRouter.post('/user', (request, response) => userController.createUser(request, response));
userRouter.get('/user',(request,response)=> userController.getAllUser(request, response))
export { userRouter };
