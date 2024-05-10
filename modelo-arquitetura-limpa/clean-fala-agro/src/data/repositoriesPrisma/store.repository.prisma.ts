import { Store } from "../../domain/models/store.model";
import { prisma } from "../prisma";
import { StoreRepositoryInterface } from "../repositories/store.repository.inferface";



export class StoreRepositoryPrisma implements StoreRepositoryInterface{
   async insert(store: Store): Promise<Store> {
        try {
            const storePrisma = await prisma.store.create({
                data:{
                    name:store.name,
                    User:{
                        connect:{
                            id: store.userId
                        } 
                    }
                }
            })

            const newUser: Store = new Store({
                name:storePrisma.name,
                userId:storePrisma.userId || ""
            });
            return newUser
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }
    findById(id: string): Promise<Store | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Store[]> {
        throw new Error("Method not implemented.");
    }
    update(store: Store): Promise<Store> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}