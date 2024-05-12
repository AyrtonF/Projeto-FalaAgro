import { v4 as uuidv4 } from 'uuid';



export type SessionProps = {
    id?:string
    userId:string
    userEmail:string
    token: string
    roles: string[]
    createdAt?:Date
    updatedAt?:Date
}

export class Session {
    public props:Required<SessionProps>
    constructor(props:SessionProps) {
        this.props = {
            ...props,
            id:props.id ||  uuidv4(),
            createdAt:props.createdAt || new Date(),
            updatedAt:props.updatedAt || new Date()
        }
    }

    toJSON(){
        return this.props
     }
     get id(){
        return this.props.id
      }
      get userId(){
        return this.props.userId
      }
      get userEmail(){
        return this.props.userEmail
      }
      get token(){
        return this.props.token
      }
      get roles(){
        return this.props.roles
      }
      get createdAt(){
        return this.props.createdAt
      }
      get updatedAt(){
        return this.props.updatedAt
      }

  }