import { v4 as uuidv4 } from 'uuid';


export type UserProps = {
    id?: string; // Id opcional
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    cep:string
    numberAddress:number
    AccessName:string[]
    createdAt?:Date
    updatedAt?:Date
}



export class User{
 public props:Required<UserProps>
 constructor(props:UserProps){
   
    this.props = {
        ...props,
        id:props.id ||  uuidv4(),
        cnpj:props.cnpj || '',
        createdAt:props.createdAt || new Date(),
        updatedAt:props.updatedAt || new Date()
    }
 }

 toJSON(){
    return this.props
 }

private set name(value:string){
    this.props.name = value
}

private set email(value:string){
    this.props.email = value
}

private set password(value:string){
    this.props.password = value
}

private set cpf(value:string){
    this.props.cpf = value
}

private set cnpj(value:string){
    this.props.cnpj = value
}

private set cep(value:string){
    this.props.cep = value
}
private set numberAddress(value:number){
    this.props.numberAddress = value
}
private set AccessName(value:string[]){
    this.props.AccessName = value
}
private set id (value:string){
   this.props.id = value
}

 get id(){
   return this.props.id
 }
 get name(){
    return this.props.name
 }
 get email(){
    return this.props.email
 }
 get password(){
    return this.props.password
 }
 get cpf(){
    return this.props.cpf
 }
 get cnpj(){
    return this.props.cnpj
 }
 get cep(){
    return this.props.cep
 }
 get numberAddress(){
    return this.props.numberAddress
 }
 get AccessName(){
    return this.props.AccessName
 }
 get createAt(){
    return this.props.createdAt
 }
 get updateAt(){
    return this.props.updatedAt
 }

 
}