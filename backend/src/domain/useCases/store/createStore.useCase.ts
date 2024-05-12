import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { UserRepositoryInferface } from "../../../data/repositories/user.repository.interface";
import { Store } from "../../models/store.model";


export class CreateStoreUseCase  {
    constructor(private storeRepository:StoreRepositoryInterface,private userRepository:UserRepositoryInferface){}
    async execute(input:CreateStoreInput):Promise<CreateStoreOutput>{
        const storeInput = new Store(input)
        const userExists = await this.userRepository.findById(storeInput.userId)
        if(!userExists){
            throw new Error("Usuario não existe")
        }
        const store = await this.storeRepository.insert(storeInput)
        return store.toJSON()
    }
}



type CreateStoreInput ={
    id?: string; 
    userId : string
    name: string;
    products:Product[]
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

type CreateStoreOutput ={
    id?: string; 
    userId : string
    name: string;
    products:Product[]
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
    id: string;
    name: string;
    description?: string;
    price: number;
    quantityAvailable: number;
    images?: string[];
    categories?: string[];
    reviews?: Review[];
}
