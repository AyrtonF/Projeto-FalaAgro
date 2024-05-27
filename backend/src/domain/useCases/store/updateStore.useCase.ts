import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { Store } from "../../models/store.model";





export class UpdateStoreUseCase  {
    constructor(private storeRepository:StoreRepositoryInterface){}
    async execute(input:UpdateStoreinput):Promise<UpdateStoreOutput>{
        const store:Store|null = await this.storeRepository.findById(input.storeId);

        if (!store) {
            throw new Error("Loja não encontrada");
        }
       
        if (input.name) store.name = input.name;
        if (input.description) store.description = input.description;
        if (input.images) store.images = input.images;
        if (input.categories) store.categories = input.categories;
        if (input.contactInfo) store.contactInfo = input.contactInfo;
        if (input.openingHours) store.openingHours = input.openingHours;
        if (input.returnPolicy) store.returnPolicy = input.returnPolicy;
        if (input.followers !== undefined) store.followers = input.followers;
        if (input.reviews) store.reviews = input.reviews;

       let updatedStore:Store|null =  await this.storeRepository.update(store);

        return updatedStore

    }
}


type UpdateStoreinput ={
    storeId: string
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

type UpdateStoreOutput ={
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