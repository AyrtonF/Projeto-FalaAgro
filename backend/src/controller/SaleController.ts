import { prisma } from './../database/prisma';  // Importa o objeto prisma para interagir com o banco de dados
import { Request, Response } from 'express';  // Importa os tipos de objetos Request e Response do Express

export const createSale = async (req: Request, res: Response) => {  // Declaração da função assíncrona createSale, que lida com a criação de uma venda
                 
        const { products, userSellerId } = req.body;  // Extrai os produtos e o id do vendedor do corpo da requisição
        const { id } = req.user;  // Extrai o id do usuário (comprador) da requisição

        try {  // Inicia um bloco try-catch para lidar com erros durante a execução do código

            const productsByDatabase = await prisma.product.findMany({  // Consulta os produtos no banco de dados com base nos IDs fornecidos
                where: {
                    id: { in: products.map((product: any) => product.id) }
                }
            });

            const productWithQuantify = productsByDatabase.map(product => {  // Mapeia os produtos encontrados para incluir a quantidade de cada um
                const { id, name, price } = product;
                const quantify = products.find((p: any) => p.id === product.id).quantify;  // Encontra a quantidade correspondente ao produto
                return {
                    id,
                    name,
                    price,
                    quantify
                };
            });

            let total = 0;  // Inicializa a variável total para armazenar o valor total da venda

            for (const product of productWithQuantify) {  // Calcula o valor total da venda somando o preço de cada produto multiplicado pela quantidade
                total += product.price * parseInt(product.quantify);
            }

            if(id === userSellerId){
                return res.status(400).json({message:"Não pode existir venda para si mesmo"})
            }
            const sale = await prisma.sale.create({  // Cria uma nova venda no banco de dados
                data: {
                    total_value: total,  // Define o valor total da venda
                    Seller: { connect: { id: userSellerId } },  // Conecta o vendedor à venda
                    Buyer: { connect: { id } },  // Conecta o comprador à venda
                    SaleProduct: {  // Cria os produtos vendidos como parte da venda
                        create: productWithQuantify.map(product => ({
                            Product: { connect: { id: product.id } },  // Conecta cada produto vendido à venda
                            quantify: product.quantify,  // Define a quantidade do produto vendido
                        }))
                    } 
                },
                include: {  // Inclui os produtos vendidos na resposta da criação da venda
                    SaleProduct: true
                }
            });

            productWithQuantify.map(async (product) => {  // Atualiza a quantidade de cada produto no banco de dados após a venda
                await prisma.product.updateMany({
                    where: {
                        id: product.id
                    },
                    data: {
                        amount: {
                            decrement: parseInt(product.quantify)  // Decrementa a quantidade do produto vendido
                        }
                    }
                });
            });

            return res.status(200).json({ sale, message: "Compra realizada com sucesso" });  // Retorna a venda e uma mensagem de sucesso em formato JSON

        } catch (error) {  // Captura qualquer erro ocorrido durante a execução do código
            console.error(error);  // Registra o erro no console
            return res.status(400).json(error.message);  // Retorna uma resposta de erro com a mensagem de erro em formato JSON
        }
}
export const getAllSale = async (req:Request, res:Response) => {
    try{
        const sales = await prisma.sale.findMany({
            select:{
                id:true,
                total_value:true,
                Seller:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                Buyer:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                SaleProduct:{
                    select:{
                        Product:{
                            select:{
                                id:true,
                                name:true,
                                price:true

                            }
                        },
                        quantify:true,

                    }
                },
                created_at:true
            }
        })

        return res.status(200).json(sales)
    }catch(error){
        return res.status(400).json(error.message)
    }

}
export const getAllSaleBySeller = async(req:Request, res:Response) => {
    const {id} = req.user
    try{
        const sales = await prisma.sale.findMany({
            where:{

               sellerId:id
                },
        })
        return res.status(200).json(sales)

    }catch(error){
        console.error(error.message)
        return res.status(400).json(error.message)
    }
    
}
export const getAllSaleByBuyer = async(req:Request, res:Response) => {
    const {id} = req.user
    try{
        const sales = await prisma.sale.findMany({
            where:{

               buyerId:id
                },
        })
        return res.status(200).json(sales)

    }catch(error){
        console.error(error.message)
        return res.status(400).json(error.message)
    }
    
}