import { AccessRepositoryInterface } from "../../../data/repositories/access.repository.interface";
import { AccessNameDoesExist } from "../../../errors/errors";
import { Access } from "../../models/access.model";

export class UpdateNameAccessUseCase {
    constructor(private accessRepository:AccessRepositoryInterface){}

    async execute(input:UpdateNameAccessInput):Promise<UpdateNameAccessOutput>{
        let accessExists = await this.accessRepository.findById(input.id) 
        if (!accessExists){
            
            throw new AccessNameDoesExist()
        }
        if(input.newName =="" || input.newName.length < 3){
            throw new Error("Nome de acesso invalido")
        }
        accessExists.name = input.newName
        let updatedAccess = await this.accessRepository.update(accessExists)

        return updatedAccess
    }
}


type UpdateNameAccessInput = {
    id:string,
    newName:string
}

type UpdateNameAccessOutput = {
    id?: string; 
    name: string;
    createdAt: Date;
    updatedAt: Date;

}