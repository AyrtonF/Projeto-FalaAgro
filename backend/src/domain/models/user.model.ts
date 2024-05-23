import { v4 as uuidv4 } from 'uuid';
import { UserErrors } from '../../errors/errors';

export type UserProps = {
    id?: string
    name:string
    email:string
    password:string
    cpf:string
    cnpj?:string
    store?:StoreUser[]
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
        cnpj:props.cnpj  || '',
        store: props.store || [],
        createdAt:props.createdAt || new Date(),
        updatedAt:props.updatedAt || new Date()
    }
   
    if(!this.isValidEmail(this.email)){
      throw UserErrors.invalidEmailError
    }
    if(!this.isValidCPF(this.cpf)){
     
      throw UserErrors.invalidCPFError
    }
 
    if(!(this.cnpj == "")){
      if (!this.isValidCNPJ(this.cnpj)) {
         throw UserErrors.invalidCNPJError
       }
    }
   
 }

 toJSON(){
    return this.props
 }
 toDTO(){
    
    const { id, name, email, cpf, cnpj, cep, numberAddress, AccessName, store } = this.props;
    if(cnpj !== ""){
        return { id, name, email, cpf, cnpj, cep, numberAddress, AccessName, store }
    }else{
        return { id, name, email, cpf, cep, numberAddress, AccessName, store }
    }
    
 }

 isValidEmail(value: string): boolean {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(value);
}
 isValidCNPJ(cnpj: string): boolean {
   // Remove todos os caracteres que não são números
   const cnpjClean = cnpj.replace(/\D/g, '');

   // Verifica se o CNPJ tem 14 dígitos
   if (cnpjClean.length !== 14) {
       return false;
   }

   // Verifica se todos os dígitos são iguais
   if (/^(\d)\1{13}$/.test(cnpjClean)) {
       return false;
   }

   // Calcula o primeiro dígito verificador
   let sum = 0;
   let weight = 5;
   for (let i = 0; i < 12; i++) {
       sum += parseInt(cnpjClean.charAt(i)) * weight;
       weight = weight === 2 ? 9 : weight - 1;
   }
   let remainder = sum % 11;
   let digit1 = remainder < 2 ? 0 : 11 - remainder;

   // Verifica se o primeiro dígito verificador está correto
   if (parseInt(cnpjClean.charAt(12)) !== digit1) {
       return false;
   }

   // Calcula o segundo dígito verificador
   sum = 0;
   weight = 6;
   for (let i = 0; i < 13; i++) {
       sum += parseInt(cnpjClean.charAt(i)) * weight;
       weight = weight === 2 ? 9 : weight - 1;
   }
   remainder = sum % 11;
   let digit2 = remainder < 2 ? 0 : 11 - remainder;

   // Verifica se o segundo dígito verificador está correto
   if (parseInt(cnpjClean.charAt(13)) !== digit2) {
       return false;
   }

   // Se passou por todas as verificações, o CNPJ é válido
   return true;
}

 
isValidCPF(value: string): boolean {
    // Remove todos os caracteres que não são números
    const cpfClean = value.replace(/\D/g, '');
    
    // Verifica se o CPF tem 11 dígitos após a limpeza
    if (cpfClean.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfClean)) {
        return false;
    }
    
    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpfClean.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;
    
    // Verifica se o primeiro dígito verificador está correto
    if (parseInt(cpfClean.charAt(9)) !== digit1) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpfClean.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    // Verifica se o segundo dígito verificador está correto
    if (parseInt(cpfClean.charAt(10)) !== digit2) {
        return false;
    }

    // Se passou por todas as verificações, o CPF é válido
    return true;
}

public set name(value:string){
    this.props.name = value
}

public set email(value:string){
    if(!this.isValidEmail){
        throw new Error("Email invalido")
    }
    this.props.email = value
}

public set password(value:string){
    this.props.password = value
}

public set cpf(value:string){
    if(!this.isValidCPF){
        throw new Error("CPF invalido")
    }
    this.props.cpf = value
}

public set cnpj(value:string){
    if(!this.isValidCNPJ){
        throw new Error("CNPJ invalido")
    }
    this.props.cnpj = value
}

public set cep(value:string){
    this.props.cep = value
}
public set numberAddress(value:number){
    this.props.numberAddress = value
}
public set AccessName(value:string[]){
    this.props.AccessName = value
}
public set id (value:string){
   this.props.id = value
}
public set store (value:StoreUser[]){
    this.props.store = value
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
 get store(){
    return this.props.store
 }
 get createAt(){
    return this.props.createdAt
 }
 get updateAt(){
    return this.props.updatedAt
 }

 
}



type StoreUser = {
    name:string
    categories:string[]
    description:string
}