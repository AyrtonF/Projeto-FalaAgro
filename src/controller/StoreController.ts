import { prisma } from './../database/prisma';
import {Request,Response} from 'express'


export const createStore = async (req:Request, res:Response) =>{
    const {name} = req.body
    const {userId} =  req.params
    const isUser = await prisma.user.findUnique({ //buscando um id que tenha o mesmo valor do parametro da requisição
        where:{
            id : userId,
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
                    id:userId
                } 
            }
        }
    })

    return res.json(store)
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