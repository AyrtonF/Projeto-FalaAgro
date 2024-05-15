import { Router } from 'express';
import { UserRepositoryPrisma } from '../data/repositoriesPrisma/user.repository.prisma';
import { AccessRepositoryPrisma } from '../data/repositoriesPrisma/access.repository.prisma';
import { CreateUserUseCase } from '../domain/useCases/user/createUser.useCase';
import { GetAllUserUseCase } from '../domain/useCases/user/getAllUser.useCase';
import { SignInUseCase } from '../domain/useCases/user/signIn.useCase';
import { DeleteAllUsersUseCase } from '../domain/useCases/user/deleteAllUsers.useCase';
import { GetUserByIdUseCase } from '../domain/useCases/user/getUserById.useCase';
import { UserController } from '../interface/controllers/user.controller';

const userRouter = Router();
const userRepository = new UserRepositoryPrisma();
const accessRepository = new AccessRepositoryPrisma();

// Instanciando os casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository, accessRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository);
const signInUseCase = new SignInUseCase(userRepository);
const deleteAllUsersUseCase = new DeleteAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

// Instanciando o controlador
const userController = new UserController({
    createUserUseCase,
    getAllUserUseCase,
    signInUseCase,
    deleteAllUsersUseCase,
    getUserByIdUseCase
});

// Rotas
userRouter.post('/user', (request, response) => userController.createUser(request, response));
userRouter.get('/user', (request, response) => userController.getAllUser(request, response));
userRouter.get('/user/:id', (request, response) => userController.getUserById(request, response));
userRouter.post('/sign-in', (request, response) => userController.signInUseCase(request, response));
userRouter.delete('/user-delete-all', (request, response) => userController.deleteAll(request, response));

export { userRouter };
