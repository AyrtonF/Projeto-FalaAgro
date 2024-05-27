import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";




export class DeleteAllStoreUseCase {
    constructor(private storeRepository:StoreRepositoryInterface){}
    async execute(): Promise<DeleteAllStoreOutput> {
        try {
          const deleted:boolean = await this.storeRepository.deleteAll();
          const message = deleted ? "Todos as lojas foram deletados com sucesso." : "Nenhuma loja foi deletada.";
          return { message};
        } catch (error) {
          console.error("Erro ao executar a exclusão de todos os produtos: ", error);
          throw new Error("Erro ao executar a exclusão de todos os produtos: " + (error instanceof Error ? error.message : ""));
        }
      }
}



type DeleteAllStoreOutput = {
    message:string
}
