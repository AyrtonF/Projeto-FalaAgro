import { User } from '../../domain/models/user.model';
import { UserRepositoryPrisma } from './user.repository.prisma'; // ajuste o caminho conforme necessário
import { PrismaClient } from '@prisma/client';

// Crie uma instância de PrismaClient para uso nos testes
const prisma = new PrismaClient();

// Inicie os testes
describe('UserRepositoryPrisma', () => {
    let userRepository: UserRepositoryPrisma;

    // Antes de cada teste, reinicie o banco de dados Prisma
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM "User";`; // Limpe a tabela de usuários
        userRepository = new UserRepositoryPrisma();
    });

    // Teste para o método insert
    test('insert should add a new user to the database', async () => {
        // Criar um usuário de exemplo para inserção
        const userPrisma = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            cpf: '12345678900',
            cep: '12345678',
            numberAddress: 123,
            AccessName: ['buyer'],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Executar o método de inserção
        const user = new User(userPrisma)
        const insertedUser = await userRepository.insert(user);

        // Verificar se o usuário foi inserido corretamente
        expect(insertedUser).toBeDefined();
        expect(insertedUser.id).toBeDefined(); // Certifique-se de que o ID tenha sido gerado
        expect(insertedUser.name).toBe(user.name);
        expect(insertedUser.email).toBe(user.email);
        // Adicione mais verificações conforme necessário para outras propriedades
    });

    // Adicione testes semelhantes para os métodos findById, findAll, update e delete conforme necessário
});
