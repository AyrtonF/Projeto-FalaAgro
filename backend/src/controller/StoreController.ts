import { prisma } from './../database/prisma';
import {Request,Response} from 'express'


export const createStore = async (req:Request, res:Response) =>{
        try {
            const {name} = req.body
        const {id} =  req.user
        const isUser = await prisma.user.findUnique({ //buscando um id que tenha o mesmo valor do parametro da requisição
            where:{
                id ,
            },
        })

        if (!isUser){
            return res.status(400).json({message:"não existe nenhum usuario associado ao id informado"})
        }
        const store = await prisma.store.create({
            data:{
                name,
                User:{
                    connect:{
                        id
                    } 
                }
            }
        })

        return res.json(store)
        
    } catch (error) {
        return res.status(400).json(error.message)
    }
    
}

export const getAllStore = async (req:Request,res:Response) => {
    const store = await prisma.store.findMany({
        select:{
            id : true,
            name : true,
            User:{
                select:{
                    name:true
                }
            },
            Product:{
                select:{
                    id:true,
                    name:true,
                    price:true,
                    amount:true
                }
            },
        }
    })
    return res.json(store)
}