import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { StoreNotFoundError, UserNotOwnerError } from "../../../errors/errors";
import { Store } from "../../models/store.model";


export class GetStoreByIdUseCase {
    constructor(private storeRepository:StoreRepositoryInterface) {}

    async execute(input: GetStoreByIdInput): Promise<GetStoreByIdOutput> {
        const store:Store|null = await this.storeRepository.findById(input.storeId);
        
        if (!store) {
            throw new StoreNotFoundError
        }
       /*  const isOwner:boolean   = await this.storeRepository.isUserOwnerOfStore({storeId:input.storeId,userId:input.userId})
        if(!isOwner ){
           throw new UserNotOwnerError()
        } */
        return store.toJSON()
    }
}
type GetStoreByIdInput = {
    //userId:string
    storeId:string
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