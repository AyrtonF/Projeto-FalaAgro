import { Router } from 'express';
import { CreateUserUseCase } from '../../../../domain/useCases/user/createUser.useCase';
import { UserRepositoryPrisma } from '../../../../data/repositoriesPrisma/user.repository.prisma';
import { GetAllUserUseCase } from '../../../../domain/useCases/user/getAllUser.useCase';
import { UserController } from '../../../../interface/controllers/user.controller';
import { AccessRepositoryPrisma } from '../../../../data/repositoriesPrisma/access.repository.prisma';
import { SignInUseCase } from '../../../../domain/useCases/user/signIn.useCase';
const userRouter = Router();
const userRepository = new UserRepositoryPrisma();
const accessRepository = new AccessRepositoryPrisma()
const createUserUseCase = new CreateUserUseCase(userRepository,accessRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository)
const signInUseCase = new SignInUseCase(userRepository)

const userController = new UserController({createUserUseCase, getAllUserUseCase,signInUseCase})

userRouter.post('/user', (request, response) => userController.createUser(request, response));
userRouter.get('/user',(request,response)=> userController.getAllUser(request, response))
userRouter.post('/sign-in',(request,response)=> userController.signInUseCase(request, response))
export { userRouter };
