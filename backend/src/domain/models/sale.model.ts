import { v4 as uuidv4 } from 'uuid';
import { UserErrors } from '../../errors/errors';


export type SaleProps = {
    id?: string
    productsId:string
    userSellerId:string
    userBuyerId:string
    quantify:number
    totalValue:number
}