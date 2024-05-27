import { Access } from "../../domain/models/access.model";
import { AccessRepositoryInterface } from "../repositories/access.repository.interface";
import { prisma } from "../prisma";
import { InternalServerError } from "../../errors/errors";

export class AccessRepositoryPrisma implements AccessRepositoryInterface {
   async doesAccessExist(accessName: string[]): Promise<boolean> {
        try {
            const accessExists = await Promise.all(accessName.map(name => prisma.access.findUnique({ where: { name } })));
            return accessExists.every(access => access !== null);
        } catch (error) {
            throw new Error("Error while finding access");
        }
      
    }
    async insert(access: Access): Promise<Access> {
        try {
            const prismaAccess = await prisma.access.create({
                data: {
                    name: access.name,
                }
            });

            const newAccess: Access = new Access({
                id: prismaAccess.id,
                name: prismaAccess.name,
                createdAt: prismaAccess.createdAt,
                updatedAt: prismaAccess.updatedAt,
            });

            return newAccess;
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }

    async findById(id: string): Promise<Access | null> {
        try {
            const accessFromPrisma = await prisma.access.findUnique({
                where: {
                    id: id,
                },
            });

            if (!accessFromPrisma) {
                return null;
            }

            const access: Access = new Access({
                id: accessFromPrisma.id,
                name: accessFromPrisma.name,
                createdAt: accessFromPrisma.createdAt,
                updatedAt: accessFromPrisma.updatedAt,
            });

            return access;
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }

    async findAll(): Promise<Access[]> {
        try {
            const accessesFromPrisma = await prisma.access.findMany();

            const accesses: Access[] = accessesFromPrisma.map(accessFromPrisma => {
                return new Access({
                    id: accessFromPrisma.id,
                    name: accessFromPrisma.name,
                    createdAt: accessFromPrisma.createdAt,
                    updatedAt: accessFromPrisma.updatedAt,
                });
            });

            return accesses;
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }

    async update(access: Access): Promise<Access> {
        try {
            const updatedAccessFromPrisma = await prisma.access.update({
                where: {
                    id: access.id
                },
                data: {
                    name: access.name,
                },
            });

            const updatedAccess: Access = new Access({
                id: updatedAccessFromPrisma.id,
                name: updatedAccessFromPrisma.name,
                createdAt: updatedAccessFromPrisma.createdAt,
                updatedAt: updatedAccessFromPrisma.updatedAt,
            });

            return updatedAccess;
        } catch (error) {
            throw new Error("Error while updating access");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.access.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new Error("Error while deleting access");
        }
    }
}
