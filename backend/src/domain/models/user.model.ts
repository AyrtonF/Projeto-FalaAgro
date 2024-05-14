import { v4 as uuidv4 } from 'uuid';


export type UserProps = {
    id?: string; 
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
        cnpj:props.cnpj  || '',
        createdAt:props.createdAt || new Date(),
        updatedAt:props.updatedAt || new Date()
    }
   
    if(!this.isValidCPF(this.cpf)){
      
      throw new Error("CPF invalido")
    }
    console.log(this.cnpj==""?"Sim":"Não")
    if(!(this.cnpj == "")){
      if (!this.isValidCNPJ(this.cnpj)) {
         throw new Error("CNPJ invalido")
       }
    }
   
 }

 toJSON(){
    return this.props
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

   // Verifica se o CPF tem 11 dígitos
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