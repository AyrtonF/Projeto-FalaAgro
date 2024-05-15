
import { User } from "../../domain/models/user.model";
import { InternalServerError, MissingIdentifierError, UserNotFoundError } from "../../errors/user.errors";
import { prisma } from "../prisma";
import { UserRepositoryInterface } from "../repositories/user.repository.interface";

export class UserRepositoryPrisma implements UserRepositoryInterface {

    async insert(user: User): Promise<User> {
        try {
            const prismaUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    cpf: user.cpf,
                    cnpj: user.cnpj,
                    cep: user.cep,
                    numberAddress: user.numberAddress,
                    UserAccess: {
                        create: user.AccessName.map(name => ({
                            Access: {
                                connect: { name },
                            },
                        })),
                    },
                    createdAt: user.createAt, 
                    updatedAt: user.updateAt, 
                },
                include:{
                    UserAccess:{
                        include:{
                        Access:true
                    }}
                }
            });
            
            return this.mapPrismaUserToDomain(prismaUser);

        } catch (error) {

            throw new Error("Erro na criação do novo usuario")
        }
    }
    async findById(id: string): Promise<User | null> {
        try {
            const prismaUser = await prisma.user.findUnique({
                where: { id },
                include:{
                    UserAccess:{
                        include:{
                            Access:true
                        }
                    }
                }
            });

            if (!prismaUser) {
                return null
            }
           

            return this.mapPrismaUserToDomain(prismaUser);
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async findByEmail(email: string): Promise<User | null> {
        try {
            const userFromPrisma = await prisma.user.findUnique({
                where: {
                    email: email,
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
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async findAll(): Promise<User[]> {
        try {
            const usersFromPrisma = await prisma.user.findMany(
                {
                    include:{
                        UserAccess:{
                            include:{
                                Access:true
                            }
                        }
                    }
                }
            );

           
            const users: User[] = usersFromPrisma.map(userPrisma => {
                return this.mapPrismaUserToDomain(userPrisma)
            });

            return users;
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async update(user: User): Promise<User> {
        try {
            let valid = await (prisma.user.findUnique({ where: { id:user.id } })) == null ? true : false
            if(!valid){
                throw new UserNotFoundError
            }
            const updatedUserFromPrisma = await prisma.user.update({
                where: {
                    id: user.id
                },
                include:{
                    UserAccess:{
                        include:{
                        Access:true
                    }}
                },
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    cpf: user.cpf,
                    cnpj: user.cnpj || '',
                    cep: user.cep,
                    numberAddress: user.numberAddress,
                },
            });
            console.error("aqui "+updatedUserFromPrisma)

           

            return this.mapPrismaUserToDomain(updatedUserFromPrisma);
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            const valid = await (prisma.user.findUnique({ where: { id } })) ? true : false
            return valid
        } catch (error) {
            throw new Error("Error while deleting user");
        }
    }
    async doesUserExist(email?: string, id?: string): Promise<boolean> {
        try {
            let user;
            if (email) {
                user = await prisma.user.findUnique({ where: { email } });
            } else if (id) {
                user = await prisma.user.findUnique({ where: { id } });
            } else {
                throw new MissingIdentifierError();
            }

            return !!user;
        } catch (error) {
            throw new Error("Erro interno durante a verificação do id ou email");
        }
    }
    async isUniqueEmail(email: string): Promise<boolean> {
        try {
            const valid = await (prisma.user.findUnique({ where: { email: email, } })) == null ? true : false
            return valid
        } catch (error) {

            throw new Error("Erro interno durante a verificação do email");
        }

    }
    async getPasswordByEmail(email: string): Promise<string> {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    password: true
                }
            });
            if (!user) {
                throw new Error("usuario não existe")
            }
            if (!user?.password == null) {
                throw new Error("Senha não existe")
            }

            let passwordPrisma: string = user.password || ""


            return passwordPrisma

        } catch (error) {
            throw new Error("Erro interno durante a verificação do email");
        }
    }
    async getRolesUserByEmail(email: string): Promise<{ userId: string; roles: string[]; }> {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    UserAccess: {
                        include: {
                            Access: true
                        }
                    }
                }
            });
    
            if (!user) {
                throw new UserNotFoundError(); 
            }
    
            const roles = user.UserAccess.map((ua) => ua.Access?.name || '');
    
            return {
                userId: user.id || '',
                roles: roles
            };
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    private mapPrismaUserToDomain(prismaUser: any): User {
        const accessNames = prismaUser.UserAccess.map((access: any) => access.Access?.name || '');
    
        return new User({
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            cpf: prismaUser.cpf,
            cnpj: prismaUser.cnpj ?? '',
            cep: prismaUser.cep,
            numberAddress: prismaUser.numberAddress,
            AccessName: accessNames,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });
    }
    async deleteAll(): Promise<any> {
        try {
            await prisma.user.deleteMany()
        } catch (error) {
            throw new Error("Erro no processo de deletar tudo")
        }
    }

}





