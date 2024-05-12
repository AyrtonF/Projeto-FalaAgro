import { AccessRepositoryInferface } from "../../../data/repositories/access.repository.interface";
import { Access } from "../../models/access.model";

export class CreateAccessUseCase {
    constructor(private accessRepository:AccessRepositoryInferface){}

    async execute(input:CreateAccessInput):Promise<CreateAccessOutoput>{
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