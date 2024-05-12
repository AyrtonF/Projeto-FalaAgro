import { User } from "../../domain/models/user.model";

export interface UserRepositoryInferface {
      
    insert(user: User): Promise<User>
   
    findById(id: string): Promise<User | null>

    getPasswordByEmail(email:string): Promise<string>
    
    getUserRolesByEmail(email:string):Promise<{ userId: string | null, roles: string[] }>
    
    doesUserExist(email:string):Promise<boolean>

    

    isUniqueEmail(email:string):Promise<boolean>
    
    findAll(): Promise<User[]>
    
    update(user: User): Promise<User>

    delete(id: string): Promise<void>
}