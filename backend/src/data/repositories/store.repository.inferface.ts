import { Store } from "../../domain/models/store.model";

export interface StoreRepositoryInterface{
    insert(store: Store): Promise<Store>;
   
    findById(id: string): Promise<Store | null>;

    findByUserId(userId: string): Promise<Store | null>;
    
    findAll(): Promise<Store[]>;
    
    update(store: Store): Promise<Store>;

    delete(id: string): Promise<boolean>;
    
    deleteAll(): Promise<boolean>;

    isUserOwnerOfStore({userId, storeId}:{userId: string, storeId: string}):Promise<boolean>
}