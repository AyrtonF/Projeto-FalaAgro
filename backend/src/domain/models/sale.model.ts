import { v4 as uuidv4 } from 'uuid';
import { UserErrors } from '../../errors/errors';


export type SaleProps = {
    id?: string
    products:Product[]
    userSellerId:string
    userBuyerId:string
    totalValue:number
    createdAt?:Date
    updatedAt?:Date
}

export class Sale {
    public props:Required<SaleProps>
    constructor(props:SaleProps){
   
        this.props = {
            ...props,
            id:props.id ||  uuidv4(),
            createdAt:props.createdAt || new Date(),
            updatedAt:props.updatedAt || new Date()
        }
    }
}


type Product = {
    id:string
    quantify:number
    price:number
}