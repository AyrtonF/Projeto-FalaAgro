import { Store } from "../../domain/models/store.model";
import { InternalServerError } from "../../errors/errors";
import { prisma } from "../prisma";
import { StoreRepositoryInterface } from "../repositories/store.repository.inferface";



export class StoreRepositoryPrisma implements StoreRepositoryInterface{
    async insert(store: Store): Promise<Store> {
        try {
            const storePrisma = await prisma.store.create({
                data:{
                    name:store.name,
                    description: store.description,
                    images: store.images,
                    categories: store.categories,
                    contactInfo: {
                        address: store.contactInfo?.address || 0,
                        email: store.contactInfo?.email || "",
                        phoneNumber: store.contactInfo?.phoneNumber || ""
                    },
                    openingHours: store.openingHours,
                    returnPolicy: store.returnPolicy,
                    followers: store.followers,
                    createdAt: store.createdAt,
                    updatedAt: store.updatedAt,
                    User:{
                        connect:{
                            id: store.userId
                        } 
                    }
                }
            })
            
            return this.mapPrismaStoreToDomain(storePrisma);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }
    async findById(id: string): Promise<Store | null> {
        try {
            const prismaStore = await prisma.store.findUnique({
                where: { id },
            });
          
            
            if (!prismaStore) {
                return null
            }
            
            
            return this.mapPrismaStoreToDomain(prismaStore);
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
    async findAll(): Promise<Store[]> {
        try {
            const prismaStores = await prisma.store.findMany({
                include:{
                    Product:{
                        select:{
                            name:true,
                            price:true,
                            amount:true,
                            status:true
                        }
                    }
                }
            });
            
            
            const stores: Store[] = prismaStores.map(prismaStore => {
                return this.mapPrismaStoreToDomain(prismaStore)
            });
            
            return stores;
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
    }
   async update(store: Store): Promise<Store> {
        try {
            let valid = await (prisma.user.findUnique({ where: { id:store.id } })) ? true : false
           
            const updatedStoreFromPrisma = await prisma.store.update({
                where: {
                    id: store.id
                },
                data: {
                    name: store.name,
                    description: store.description,
                    images: store.images,
                    categories: store.categories,
                    contactInfo: store.contactInfo ? JSON.stringify(store.contactInfo) : undefined, 
                    openingHours: store.openingHours,
                    returnPolicy: store.returnPolicy,
                    followers: store.followers,
                    
                    updatedAt: new Date(), 
                },
            });
            return this.mapPrismaStoreToDomain(updatedStoreFromPrisma);
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções da loja: "+ error.message);
            throw new InternalServerError
        }
    }
    async isUserOwnerOfStore({ userId, storeId }: { userId: string; storeId: string; }): Promise<boolean> {
        try {
            const store = await prisma.store.findUnique({
                where: { id: storeId },
                select: { userId: true }
            });
        
            return store ? store.userId === userId : false;
            
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
        
    }
   async delete(id: string): Promise<boolean> {
        try {
            await prisma.store.delete({
                where: {
                    id: id,
                },
            });
            const valid = await (prisma.store.findUnique({ where: { id } })) ? true : false
            return valid
            
        } catch (error) {
            if(error instanceof Error)  throw new Error("Erro ao obter funções do usuário: "+ error.message);
            throw new InternalServerError
        }
        
    }

    private mapPrismaStoreToDomain(prismaStore: any): Store {
        
        return new Store({
            id: prismaStore.id,
            userId: prismaStore.userId,
            name: prismaStore.name,
            description: prismaStore.description,
            Products: prismaStore.Product,
            images: prismaStore.images,
            categories: prismaStore.categories,
            contactInfo: {
                address: prismaStore.contactInfo?.address,
                email: prismaStore.contactInfo?.email,
                phoneNumber: prismaStore.contactInfo?.phoneNumber
            },
            openingHours: prismaStore.openingHours,
            returnPolicy: prismaStore.returnPolicy,
            followers: prismaStore.followers,
            reviews: prismaStore.reviews ? prismaStore.reviews.map((review: any) => ({
                rating: review.rating,
                comment: review.comment,
                userId: review.userId
            })) : [],
            createdAt: prismaStore.createdAt,
            updatedAt: prismaStore.updatedAt
        });
    }

}