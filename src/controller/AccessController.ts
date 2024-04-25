import { prisma } from './../database/prisma';
import {Request,Response} from 'express'


export const createAccess = async (req:Request, res:Response) => {
    const {name} = req.body
    const access = await prisma.access.create({data:{name}})
    return res.json(access)
}


export const getAllAccess = async (req:Request, res:Response) => {
    const access = await prisma.access.findMany()
    return res.json(access)
}