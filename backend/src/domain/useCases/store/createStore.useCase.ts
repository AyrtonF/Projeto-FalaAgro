import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { UserRepositoryInterface } from "../../../data/repositories/user.repository.interface";
import { UserNotFoundError } from "../../../errors/errors";
import { Store } from "../../models/store.model";


export class CreateStoreUseCase  {
    constructor(private storeRepository:StoreRepositoryInterface,private userRepository:UserRepositoryInterface){}
    async execute(input:CreateStoreInput):Promise<CreateStoreOutput>{
        const storeInput = new Store(input)
        const userExists = await this.userRepository.findById(storeInput.userId)
        if(!userExists){
            throw new UserNotFoundError("Usuario não existe")
        }
        const store = await this.storeRepository.insert(storeInput)
        return store.toJSON()
    }
}



type CreateStoreInput ={
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

type CreateStoreOutput ={
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
