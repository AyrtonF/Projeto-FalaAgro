import { Router } from 'express';
import { UserRepositoryPrisma } from '../data/repositoriesPrisma/user.repository.prisma';
import { AccessRepositoryPrisma } from '../data/repositoriesPrisma/access.repository.prisma';
import { CreateUserUseCase } from '../domain/useCases/user/createUser.useCase';
import { GetAllUserUseCase } from '../domain/useCases/user/getAllUser.useCase';
import { SignInUseCase } from '../domain/useCases/user/signIn.useCase';
import { UpdateUserUseCase } from '../domain/useCases/user/updateUser.useCase';
import { DeleteAllUsersUseCase } from '../domain/useCases/user/deleteAllUsers.useCase';
import { GetUserByIdUseCase } from '../domain/useCases/user/getUserById.useCase';
import { UserController } from '../interface/controllers/user.controller';
import { DeleteUserUseCase } from '../domain/useCases/user/deleteUser.useCase';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { AddAccessToUserUseCase } from '../domain/useCases/user/addAccessToUser.useCase';
import { RemoveAccessToUserUseCase } from '../domain/useCases/user/removeAccessToUser.useCase';
const userRouter = Router();
const userRepository = new UserRepositoryPrisma();
const accessRepository = new AccessRepositoryPrisma();

// Instanciando os casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository, accessRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository);
const signInUseCase = new SignInUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const deleteAllUsersUseCase = new DeleteAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const addAccessToUserUseCase = new AddAccessToUserUseCase(userRepository, accessRepository)
const removeAccessToUserUseCase = new RemoveAccessToUserUseCase(userRepository, accessRepository)
// Instanciando o controlador
const userController = new UserController({
    createUserUseCase,
    getAllUserUseCase,
    signInUseCase,
    deleteAllUsersUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    addAccessToUserUseCase,
    removeAccessToUserUseCase,
});

// Rotas
userRouter.post('/user', (request, response) => userController.createUser(request, response));
userRouter.get('/user',/* authMiddleware(["Admin"]), */ (request, response) => userController.getAllUser(request, response));
userRouter.get('/user/:id',authMiddleware(["Comprador","Vendedor","Admin"]), (request, response) => userController.getUserById(request, response));
userRouter.post('/sign-in', (request, response) => userController.signInUseCase(request, response));
userRouter.put('/user/:id',authMiddleware(["Comprador","Vendedor","Admin"]),(request, response) => userController.updateUser(request, response))
userRouter.put('/user/access/add',authMiddleware(["Comprador","Vendedor","Admin"]),(request, response) => userController.addAccessToUser(request, response))
userRouter.put('/user/access/remove',authMiddleware(["Comprador","Vendedor","Admin"]),(request, response) => userController.removeAccessToUser(request, response))
userRouter.delete('/user-delete-all',authMiddleware(["Admin"]), (request, response) => userController.deleteAll(request, response));
userRouter.delete('/user/:id',authMiddleware(["Comprador,Vendedor,Admin"]), (request, response) => userController.deleteUser(request, response));

export { userRouter };
