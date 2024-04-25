import { hash } from "bcryptjs";
import { prisma } from "./../database/prisma";
import { Request, Response } from "express";


export const createProduct = async (req:Request,res:Response) => {
    const {name,price,amount} = req.body
    const {storeId} =  req.params

    const product = await prisma.product.create({
        data:{
            name,
            price,
            amount,
            Store:{
                connect:{
                    id:storeId
                } 
            }
        }
    })

    return res.json(product)
}

export const getAllProduct = async (req:Request,res:Response) => {
    const products = await prisma.product.findMany()
    return res.json(products)
}


export const deleteAllProduct = async (req:Request,res:Response) => {
    await prisma.product.deleteMany()
    return res.json({message:"Todos os produtos deletados com sucessp"})
}