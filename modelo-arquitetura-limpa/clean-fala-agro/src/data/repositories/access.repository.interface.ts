import { Access } from "../../domain/models/access.model";


export interface AccessRepositoryInferface {
      
    insert(user: Access): Promise<Access>;
   
    findById(id: string): Promise<Access | null>;

    doesAccessExist(accessName:string[]):Promise<boolean>
    
    findAll(): Promise<Access[]>;
    
    update(user: Access): Promise<Access>;

    delete(id: string): Promise<void>;
}