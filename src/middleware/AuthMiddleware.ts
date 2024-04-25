import { Request, Response,NextFunction } from "express";
import { verify } from 'jsonwebtoken'


interface DecodedToken {
userId:string

}


export function authMiddleware(permissos?:string[]) {
    return async (req:Request,res:Response,next:NextFunction) =>{
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(403).json({message:"Token não fornecido"})
        }

        const token = authHeader.substring(7)

        try {
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY
            if(!MY_SECRET_KEY){
                throw new Error("Chave secreta não fornecida");
                
            }
            const decodedToken = verify(token,MY_SECRET_KEY) as DecodedToken

            req.user = {id:decodedToken.userId}

            if (permissos) {
                const user = await prisma.user.findUnique({
                    where:{
                        id : decodedToken.userId
                    },
                    include:{
                        UserAccess:{
                            select:{
                                Access:{
                                    select:{
                                        name : true
                                    }
                                }
                            }
                        }
                    }
                })
                const userPermissions = user?.userAccess.map((na)=> na.Access.name) ?? []
                const hasPermissions = permissos.some()
            }
        } catch (error) {
            
        }

    }
}