import { v4 as uuidv4 } from 'uuid';



/*
id
userId
name
Product
createdAt
updatedAt

*/
export type StoreProps = {
    id?: string; 
    userId : string
    name: string;
    Products?:Product[]
    description?: string;
    images?: string[];
    categories?: string[];
    contactInfo?: {
        address?: string;
        email?: string;
        phoneNumber?: string;
    };
    openingHours?: string[];
    returnPolicy?: string;
    followers?: number;
    reviews?: Review[];
    createdAt?: Date
    updatedAt?: Date
}

type Review = {
    rating: number;
    comment: string;
    userId: string;
}

type Product = {
   
    name:string,
    price:number,
    amount:number
}


export class Store{
    public props:Required<StoreProps>
    constructor(props:StoreProps){
        this.props ={
            ...props,
            id:props.id ||  uuidv4(),
            userId:props.userId,
            Products:props.Products || [],
            description: props.description || "",
                images: props.images || [],
                categories: props.categories || [],
                contactInfo: {
                    address: props.contactInfo?.address || "",
                    email: props.contactInfo?.email || "",
                    phoneNumber: props.contactInfo?.phoneNumber || "",
                },
                openingHours: props.openingHours || ['',''],
                returnPolicy: props.returnPolicy || "",
                followers: props.followers || 0,
                reviews:  [],
                createdAt: props.createdAt || new Date(),
                updatedAt: props.updatedAt || new Date()
        }
       
    }
    get id() {
        return this.props.id;
    }
    get userId(){
        return this.props.userId
    }
    
    get name() {
        return this.props.name;
    }
    
    get description() {
        return this.props.description;
    }
    get Products(){
        return this.props.Products
    }
    get images() {
        return this.props.images;
    }
    
    get categories() {
        return this.props.categories;
    }
    
    get contactInfo() {
        return this.props.contactInfo;
    }
    
    get openingHours() {
        return this.props.openingHours;
    }
    
    get returnPolicy() {
        return this.props.returnPolicy;
    }
    
    get followers() {
        return this.props.followers;
    }
    
    get reviews() {
        return this.props.reviews;
    }
    get createdAt(){
        return this.props.createdAt
    }
    get updatedAt(){
        return this.props.createdAt
    }
    public set name(value:string){
        this.props.name = value
    }
    
    set description(value: string ) {
        this.props.description = value;
    }

    set products(value: Product[]) {
        this.props.Products = value;
    }

    set images(value: string[] ) {
        this.props.images = value;
    }

    set categories(value: string[]) {
        this.props.categories = value;
    }

    set contactInfo(value: {
        address?: string;
        email?: string;
        phoneNumber?: string;
    } ) {
        this.props.contactInfo = value;
    }

    set openingHours(value: string[]) {
        this.props.openingHours = value;
    }

    set returnPolicy(value: string) {
        this.props.returnPolicy = value;
    }

    set followers(value: number ) {
        this.props.followers = value;
    }

    set reviews(value: Review[] ) {
        this.props.reviews = value;
    }

    set createdAt(value: Date ) {
        this.props.createdAt = value;
    }

    set updatedAt(value: Date) {
        this.props.updatedAt = value;
    }

    toJSON(){
        return this.props
    }
}