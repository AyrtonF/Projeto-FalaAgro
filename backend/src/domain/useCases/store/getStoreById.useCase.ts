import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { Store } from "../../models/store.model";


export class GetStoreByIdUseCase {
    constructor(private storeRepository:StoreRepositoryInterface) {}

    async execute(storeId: string): Promise<GetStoreByIdOutput> {
        const store:Store|null = await this.storeRepository.findById(storeId);
        
        if (!store) {
            throw new Error("Loja não encontrada")
        }

        return store.toJSON()
    }
}

type GetStoreByIdOutput ={
    id?: string; 
    userId : string
    name: string;
    Products?:Product[]
    description?: string;
    images?: string[];
    categories?: string[];
    contactInfo?: {
        address?: string;
        email?: string;
        phoneNumber?: string;
    };
    openingHours?: string[];
    returnPolicy?: string;
    followers?: number;
    reviews?: Review[];
    createdAt?: Date
    updatedAt?: Date
}


type Review = {
    rating: number;
    comment: string;
    userId: string;
}


type Product = {
   
    name:string,
    price:number,
    amount:number
}