import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { UserNotOwnerError } from "../../../errors/errors";



export class DeleteStoreUseCase {
    constructor(private storeRepository:StoreRepositoryInterface){}
    async execute(input:DeleteStoreInput):Promise<DeleteStoreOutput>{
        
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
