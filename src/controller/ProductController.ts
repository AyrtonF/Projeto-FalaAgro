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


export const updateProduct = async(req:Request,res:Response) =>{
    const {name,price,amount} = req.body
    const {productId} =  req.params
    const {id} = req.user
    try {
        const isProduct = await prisma.product.findUnique({
            where:{
                id : productId
            },
            include:{
                Store:true
            }
        })
    
        if(!isProduct){
            return res.status(404).json({message:"Produto não existe"})
        }
    
        if(id !== isProduct?.Store?.userId ){
            return res.status(404).json({message:"Usuario não é dono do produto"})
        }
        const product = await prisma.product.update({
            where:{
                id:productId
            },
            data:{
                name,
                price,
                amount
            }
    
        }) 
    
        return res.status(200).json(product)
    
        
    } catch (error) {
        return res.status(400).json(error.message)
    }
    
}
export const getUniqueProduct = async (req:Request,res:Response) => {
    const {productId} = req.params
    const {id} = req.user
    try {
        const product = await prisma.product.findUnique({
            where:{
                id : productId
            }, 
           
        })
        if(!product){
            return res.status(404).json({message:"Produto não existe"})
        }

        return res.status(200).json(product)
    } catch (error) {
        
        return res.status(400).json(error.message)
    }
}
export const getAllProduct = async (req:Request,res:Response) => {
    const products = await prisma.product.findMany()
    return res.json(products)
}

export const deleteUniqueProduct = async (req:Request,res:Response) => {
    const {productId} = req.params
    const {id} = req.user
    try {

        const isProduct = await prisma.product.findUnique({
            where:{
                id : productId
            },
            include:{
                Store:true
            }
        })
    
        if(!isProduct){
            return res.status(404).json({message:"Produto não existe"})
        }
    
        if(id !== isProduct?.Store?.userId ){
            return res.status(404).json({message:"Usuario não é dono do produto"})
        }


        await prisma.product.deleteMany({
            where:{
                id:productId
            }
        })

        res.status(200).json({message:"Produto deletado com sucesso"})
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
export const deleteAllProduct = async (req:Request,res:Response) => {
    await prisma.product.deleteMany()
    return res.json({message:"Todos os produtos deletados com sucessp"})
}