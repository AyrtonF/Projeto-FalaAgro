import { User } from "../../domain/models/user.model";

export interface UserRepositoryInferface {
      
    insert(user: User): Promise<User>
   
    findById(id: string): Promise<User | null>

    findByEmail(email:string):Promise<any>

    isUniqueEmail(email:string):Promise<boolean>

    doesUserExist(email:string):Promise<boolean>

    getPasswordByEmail(email:string):Promise<string>

    getRolesUserByEmail(email:string):Promise<{userId:string,roles:string[]}>

    findAll(): Promise<User[]>
    
    update(user: User): Promise<User>

    delete(id: string): Promise<boolean>
}