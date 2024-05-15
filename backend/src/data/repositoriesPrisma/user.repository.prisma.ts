import { User } from "../../domain/models/user.model";
import { MissingIdentifierError, UserNotFoundError } from "../../errors/user.errors";
import { prisma } from "../prisma";
import { UserRepositoryInterface } from "../repositories/user.repository.interface";

export class UserRepositoryPrisma implements UserRepositoryInterface{
  
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
    async getPasswordByEmail(email: string): Promise<string> {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select:{
                    password:true
                }
            });
            if(!user){
                throw new Error("usuario não existe")
            }
            if(!user?.password == null){
                throw new Error("Senha não existe")
            }
        
              let passwordPrisma:string = user.password || ""
            

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
            if (user) {
                
                const accessName = user.UserAccess?.map((ua) => ua.Access?.name || '');
            }
            if(!user){
                throw new Error("Usuario não existe")
            }
        
              let payload = {
                userId: user.id || '',
                roles: user.UserAccess.map((ua) => ua.Access?.name || '')
            };

            return payload

        } catch (error) {
            
            throw new Error("Erro interno durante a verificação do email");
        }
    }
   async findByEmail(email: string): Promise<User|null> {
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
            cnpj: prismaUser.cnpj ?? '', 
            cep: prismaUser.cep,
            numberAddress: prismaUser.numberAddress,
            AccessName: prismaUser.AccessName,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });


        return newUser 

     } catch (error) {
        
        throw new Error("Erro na criação do novo usuario")
     }
    }
    async findById(id: string): Promise<User | null> {
        try {
            const userFromPrisma = await prisma.user.findUnique({
                where: { id },
            });

            if (!userFromPrisma) {
                return null
            }

            return this.mapPrismaUserToDomain(userFromPrisma);
        } catch (error) {
            if(error instanceof Error){
                throw new Error(`Failed to find user by ID: ${error.message}`);
            }
            else{
                throw new Error("Erro interno no servidor ao buscar um id") 
            }  
        }
    }

    private mapPrismaUserToDomain(prismaUser:any): User {
        return new User({
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            cpf: prismaUser.cpf,
            cnpj: prismaUser.cnpj || '', 
            cep: prismaUser.cep,
            numberAddress: prismaUser.numberAddress,
            AccessName: prismaUser.AccessName,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });
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
                    cnpj: userFromPrisma.cnpj || '', 
                    cep: userFromPrisma.cep,
                    numberAddress: userFromPrisma.numberAddress,
                    AccessName: userFromPrisma.AccessName,
                    createdAt: userFromPrisma.createdAt,
                    updatedAt: userFromPrisma.updatedAt,
                });
            });
    
            return users;
        } catch (error) {
            throw new Error(error.message);
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
                    AccessName: user.AccessName,
                    password: user.password,
                    cpf: user.cpf,
                    cnpj: user.cnpj || '', 
                    cep: user.cep,
                    numberAddress: user.numberAddress,
                },
            });

           
            const updatedUser: User = new User({
                id: updatedUserFromPrisma.id,
                name: updatedUserFromPrisma.name,
                email: updatedUserFromPrisma.email,
                password: updatedUserFromPrisma.password,
                cpf: updatedUserFromPrisma.cpf,
                cnpj: updatedUserFromPrisma.cnpj || '', 
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
        async delete(id: string): Promise<boolean> {
            try {
                await prisma.user.delete({
                    where: {
                        id: id,
                    },
                });
                const valid = await (prisma.user.findUnique({where: {id}})) ? true : false
                return valid
            } catch (error) {
                throw new Error("Error while deleting user");
            }
        }
       async deleteAll(): Promise<any> {
            try {
                await prisma.user.deleteMany()
            } catch (error) {
                throw new Error("Erro no processo de deletar tudo")
            }
        }

}





