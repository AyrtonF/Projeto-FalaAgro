import { Session } from "../../domain/models/session.model";




export interface SessionRepositoryInterface{
    insert(session: Session): Promise<Session>;
   
    findById(id: string): Promise<Session | null>;

    findAll(): Promise<Session[]>;
    
    update(session: Session): Promise<Session>;

    delete(id: string): Promise<void>;
}