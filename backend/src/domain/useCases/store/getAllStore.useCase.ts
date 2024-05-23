import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { Store } from "../../models/store.model";


export class GetAllStoreUseCase {
    constructor(private storeRepository:StoreRepositoryInterface) {}

    async execute(): Promise<GetAllStoreOutput> {
        const stores:Store[] = await this.storeRepository.findAll();
        
        

        return stores.map(store => store.toJSON())
    }
}

type GetAllStoreOutput ={
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
}[]


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