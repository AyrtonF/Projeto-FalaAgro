import { v4 as uuidv4 } from 'uuid';

export type AccessProps = {
    id?: string; 
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Access {
    public props: Required<AccessProps>;
    
    constructor(props: AccessProps) {
        this.props = {
            ...props,
            id: props.id || uuidv4(),
            createdAt:props.createdAt || new Date(),
            updatedAt:props.updatedAt || new Date()
        };
    }

    toJSON() {
        return this.props;
    }

    
    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    
    public set name(value:string){
        this.props.name = value
    }
    public set createdAt(value:Date){
        this.props.createdAt = value
    }
    public set updatedAt(value:Date){
        this.props.updatedAt = value
    }
    
}
