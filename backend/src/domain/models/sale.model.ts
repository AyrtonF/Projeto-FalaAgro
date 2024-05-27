import { v4 as uuidv4 } from 'uuid';
import { UserErrors } from '../../errors/errors';

export type SaleProps = {
    id?: string;
    products: ProductSale[];
    userSellerId: string;
    userBuyerId: string;
    totalValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    buyerConfirmed?: boolean; 
    sellerConfirmed?: boolean; 
    status?: 'completed' | 'pending' | 'canceled';//processando
  };

export class Sale {
    public props:Required<SaleProps>
    constructor(props:SaleProps){
   
        this.props = {
            ...props,
            id:props.id ||  uuidv4(),
            buyerConfirmed:props.buyerConfirmed || false,
            sellerConfirmed:props.sellerConfirmed || false,
            totalValue:props.totalValue || 0,
            status: props.status ||'pending',
            createdAt:props.createdAt || new Date(),
            updatedAt:props.updatedAt || new Date()
        }
    }
    get id() {
        return this.props.id;
      }
     toJSON(){
        return this.props
      }
      toDTO(){
        {}
        this.props
      }
      get products() {
        return this.props.products;
      }
      get userSellerId() {
        return this.props.userSellerId;
      }
      get userBuyerId() {
        return this.props.userBuyerId;
      }
      get totalValue() {
        return this.props.totalValue;
      }
      get status(){
        return this.props.status
      }
      get buyerConfirmed(){
        return this.props.buyerConfirmed
      }
      get sellerConfirmed(){
        return this.props.sellerConfirmed
      }
      get createdAt() {
        return this.props.totalValue;
      }
      get updatedAt() {
        return this.props.totalValue;
      }



      set status(value:'completed' | 'pending' | 'canceled') {
        this.props.status = value;
      }
      set buyerConfirmed(value: boolean) {
        this.props.buyerConfirmed = value;
      }
      set sellerConfirmed(value: boolean) {
        this.props.sellerConfirmed = value;
      }
      set totalValue(value: number) {
        this.props.totalValue = value;
      }
    
    
}



type ProductSale = {
    id:string
    name:string
    quantify:number
    price:number
}