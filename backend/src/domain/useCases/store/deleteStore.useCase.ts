import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { StoreNotFoundError, UserNotOwnerError } from "../../../errors/errors";
import { Store } from "../../models/store.model";



export class DeleteStoreUseCase {
    constructor(private storeRepository:StoreRepositoryInterface){}
    async execute(input:DeleteStoreInput):Promise<DeleteStoreOutput>{
        const store:Store|null = await this.storeRepository.findById(input.storeId);
        
        if (!store) {
            throw new StoreNotFoundError
        }
        const isOwner:boolean   = await this.storeRepository.isUserOwnerOfStore({storeId:input.storeId,userId:input.userId})
        if(!isOwner ){
           throw new UserNotOwnerError()
        }

       await this.storeRepository.delete(input.storeId)
       

       return {message:"Loja deletado com sucesso"}
    }
}



type DeleteStoreOutput = {
    message:string
}


type DeleteStoreInput = {
    userId:string
    storeId:string
}
