import { v4 as uuidv4 } from 'uuid';
import { InvalidFieldTypeError } from '../../errors/errors';

export type StoreProps = {
    id?: string; 
    userId: string;
    name: string;
    Products?: Product[];
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
    createdAt?: Date;
    updatedAt?: Date;
}

type Review = {
    rating: number;
    comment: string;
    userId: string;
}

type Product = {
    name: string;
    price: number;
    amount: number;
}

export class Store {
    public props: Required<StoreProps>;

    constructor(props: StoreProps) {
        if (typeof props.userId !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: userId");
        if (typeof props.name !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: name");
        if (props.description && typeof props.description !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: description");
        if (props.images && !Array.isArray(props.images)) throw new InvalidFieldTypeError("Tipo inválido para o campo: images");
        if (props.categories && !Array.isArray(props.categories)) throw new InvalidFieldTypeError("Tipo inválido para o campo: categories");
        if (props.contactInfo) {
            if (props.contactInfo.address && typeof props.contactInfo.address !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: address");
            if (props.contactInfo.email && typeof props.contactInfo.email !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: email");
            if (props.contactInfo.phoneNumber && typeof props.contactInfo.phoneNumber !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: phoneNumber");
        }
        if (props.openingHours && !Array.isArray(props.openingHours)) throw new InvalidFieldTypeError("Tipo inválido para o campo: openingHours");
        if (props.returnPolicy && typeof props.returnPolicy !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: returnPolicy");
        if (props.followers && typeof props.followers !== 'number') throw new InvalidFieldTypeError("Tipo inválido para o campo: followers");
        if (props.reviews && !Array.isArray(props.reviews)) throw new InvalidFieldTypeError("Tipo inválido para o campo: reviews");
        if (props.createdAt && !(props.createdAt instanceof Date)) throw new InvalidFieldTypeError("Tipo inválido para o campo: createdAt");
        if (props.updatedAt && !(props.updatedAt instanceof Date)) throw new InvalidFieldTypeError("Tipo inválido para o campo: updatedAt");

        this.props = {
            ...props,
            id: props.id || uuidv4(),
            userId: props.userId,
            Products: props.Products || [],
            description: props.description || "",
            images: props.images || [],
            categories: props.categories || [],
            contactInfo: {
                address: props.contactInfo?.address || "",
                email: props.contactInfo?.email || "",
                phoneNumber: props.contactInfo?.phoneNumber || "",
            },
            openingHours: props.openingHours || ['', ''],
            returnPolicy: props.returnPolicy || "",
            followers: props.followers || 0,
            reviews: props.reviews || [],
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };
    }

    get id() {
        return this.props.id;
    }

    get userId() {
        return this.props.userId;
    }

    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get Products() {
        return this.props.Products;
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

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    public set name(value: string) {
        if (typeof value !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: name");
        this.props.name = value;
    }

    public set description(value: string) {
        if (typeof value !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: description");
        this.props.description = value;
    }

    public set products(value: Product[]) {
        if (!Array.isArray(value)) throw new InvalidFieldTypeError("Tipo inválido para o campo: Products");
        this.props.Products = value;
    }

    public set images(value: string[]) {
        if (!Array.isArray(value)) throw new InvalidFieldTypeError("Tipo inválido para o campo: images");
        this.props.images = value;
    }

    public set categories(value: string[]) {
        if (!Array.isArray(value)) throw new InvalidFieldTypeError("Tipo inválido para o campo: categories");
        this.props.categories = value;
    }

    public set contactInfo(value: {
        address?: string;
        email?: string;
        phoneNumber?: string;
    }) {
        if (typeof value !== 'object') throw new InvalidFieldTypeError("Tipo inválido para o campo: contactInfo");
        if (value.address && typeof value.address !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: address");
        if (value.email && typeof value.email !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: email");
        if (value.phoneNumber && typeof value.phoneNumber !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: phoneNumber");
        this.props.contactInfo = value;
    }

    public set openingHours(value: string[]) {
        if (!Array.isArray(value)) throw new InvalidFieldTypeError("Tipo inválido para o campo: openingHours");
        this.props.openingHours = value;
    }

    public set returnPolicy(value: string) {
        if (typeof value !== 'string') throw new InvalidFieldTypeError("Tipo inválido para o campo: returnPolicy");
        this.props.returnPolicy = value;
    }

    public set followers(value: number) {
        if (typeof value !== 'number') throw new InvalidFieldTypeError("Tipo inválido para o campo: followers");
        this.props.followers = value;
    }

    public set reviews(value: Review[]) {
        if (!Array.isArray(value)) throw new InvalidFieldTypeError("Tipo inválido para o campo: reviews");
        this.props.reviews = value;
    }

    public set createdAt(value: Date) {
        if (!(value instanceof Date)) throw new InvalidFieldTypeError("Tipo inválido para o campo: createdAt");
        this.props.createdAt = value;
    }

    public set updatedAt(value: Date) {
        if (!(value instanceof Date)) throw new InvalidFieldTypeError("Tipo inválido para o campo: updatedAt");
        this.props.updatedAt = value;
    }

    toJSON() {
        return this.props;
    }
}
