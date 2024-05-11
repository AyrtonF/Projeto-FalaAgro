import { User } from "../../domain/models/user.model";
import { prisma } from "../prisma";
import { UserRepositoryInferface } from "../repositories/user.repository.interface";
import { hash } from "bcryptjs";

export class UserRepositoryPrisma implements UserRepositoryInferface{
   async findByEmail(email: string): Promise<string> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    UserAccess: true
                },
            });
           
              let payload = {
                userId: user.id || '',
                roles: user.UserAccess.map((ua) => ua.Access?.name || '')
            };
            return "payload"
        } catch (error) {
            
            throw new Error("Erro interno durante a verificação do email");
        }
    }
    
   async isUniqueEmail(email: string): Promise<boolean> {
        try {
            const valid = await (prisma.user.findUnique({where: {email: email,}})) == null ? true : false
            return valid
        } catch (error) {
            
            throw new Error("Erro interno durante a verificação do email");
        }
        
    }

    async insert(user: User): Promise<User> {
     try {
         const prismaUser  = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                cpf: user.cpf,
                cnpj: user.cnpj,
                cep: user.cep,
                numberAddress: user.numberAddress,
                AccessName: user.AccessName,
                createdAt: user.createAt || null,
                updatedAt: user.updateAt
            }
        })

        const newUser: User = new User({
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            cpf: prismaUser.cpf,
            cnpj: prismaUser.cnpj ?? '', // Garantindo que cnpj seja uma string
            cep: prismaUser.cep,
            numberAddress: prismaUser.numberAddress,
            AccessName: prismaUser.AccessName,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });


        return newUser 

     } catch (error) {
        //console.error(error.message)
        throw new Error("Erro na criação do novo usuario")
     }
    }
    async findById(id: string): Promise<User | null> {
        try {
            const userFromPrisma = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!userFromPrisma) {
                return null;
            }

            const user: User = new User({
                id: userFromPrisma.id,
                name: userFromPrisma.name,
                email: userFromPrisma.email,
                password: userFromPrisma.password,
                cpf: userFromPrisma.cpf,
                cnpj: userFromPrisma.cnpj || '', 
                cep: userFromPrisma.cep,
                numberAddress: userFromPrisma.numberAddress,
                AccessName: userFromPrisma.AccessName,
                createdAt: userFromPrisma.createdAt,
                updatedAt: userFromPrisma.updatedAt,
            });

            return user;
        } catch (error) {
            throw new Error("Error na busca do id");
        }
    }
    async findAll(): Promise<User[]> {
        try {
            const usersFromPrisma = await prisma.user.findMany();

            // Mapeie os dados do Prisma para a classe User
            const users: User[] = usersFromPrisma.map(userFromPrisma => {
                return new User({
                    id: userFromPrisma.id,
                    name: userFromPrisma.name,
                    email: userFromPrisma.email,
                    password: userFromPrisma.password,
                    cpf: userFromPrisma.cpf,
                    cnpj: userFromPrisma.cnpj || '', // Certifique-se de tratar valores nulos
                    cep: userFromPrisma.cep,
                    numberAddress: userFromPrisma.numberAddress,
                    AccessName: userFromPrisma.AccessName,
                    createdAt: userFromPrisma.createdAt,
                    updatedAt: userFromPrisma.updatedAt,
                });
            });

            return users;
        } catch (error) {
            throw new Error("Erro ao enviar todos os usuarios");
        }
    }
    async update(user: User): Promise<User> {
        try {
            const updatedUserFromPrisma = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    cpf: user.cpf,
                    cnpj: user.cnpj || '', // Certifique-se de tratar valores nulos
                    cep: user.cep,
                    numberAddress: user.numberAddress,
                    AccessName: user.AccessName,
                },
            });

            // Mapeie os dados do Prisma para a classe User
            const updatedUser: User = new User({
                id: updatedUserFromPrisma.id,
                name: updatedUserFromPrisma.name,
                email: updatedUserFromPrisma.email,
                password: updatedUserFromPrisma.password,
                cpf: updatedUserFromPrisma.cpf,
                cnpj: updatedUserFromPrisma.cnpj || '', // Certifique-se de tratar valores nulos
                cep: updatedUserFromPrisma.cep,
                numberAddress: updatedUserFromPrisma.numberAddress,
                AccessName: updatedUserFromPrisma.AccessName,
                createdAt: updatedUserFromPrisma.createdAt,
                updatedAt: updatedUserFromPrisma.updatedAt,
            });

            return updatedUser;
        } catch (error) {
            throw new Error("Error na atualização do usuario");
        }
    }
        async delete(id: string): Promise<void> {
            try {
                await prisma.user.delete({
                    where: {
                        id: id,
                    },
                });
            } catch (error) {
                throw new Error("Error while deleting user");
            }
        }
    

}





