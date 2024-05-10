import { User } from "../../domain/models/user.model";

export interface UserRepositoryInferface {
      
    insert(user: User): Promise<User>;
   
    findById(id: string): Promise<User | null>;

    isUniqueEmail(email:string):Promise<boolean>

    findAll(): Promise<User[]>;
    
    update(user: User): Promise<User>;

    delete(id: string): Promise<void>;
}