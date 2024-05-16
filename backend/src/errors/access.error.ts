export class AccessError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class AccessNameDoesExist extends Error {
    status: number;
    constructor(message?: string, status?: number) {
        super(message || "Nível de acesso já existe");
        this.name = "AccessNameDoesExist";
        this.status = status || 400; // Bad Request
    }
    toJSON(){
        return {name:this.name, status:this.status, message:this.message}
    }
}