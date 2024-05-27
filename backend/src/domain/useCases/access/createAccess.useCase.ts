import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { AccessNameDoesExist } from "../../../errors/errors";
import { Access } from "../../models/access.model";

export class CreateAccessUseCase {
    constructor(private accessRepository:AccessRepositoryInterface){}

    async execute(input:CreateAccessInput):Promise<CreateAccessOutoput>{
        let accessExists = await this.accessRepository.doesAccessExist([input.name]) 
        if (accessExists){
            
            throw new AccessNameDoesExist()
        }
        const accessInput = new Access(input)
        const access = await this.accessRepository.insert(accessInput)
        return access.toJSON()
    }
}






type CreateAccessInput = {
    id?: string; 
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateAccessOutoput = {
    id?: string; 
    name: string;
    createdAt: Date;
    updatedAt: Date;
}