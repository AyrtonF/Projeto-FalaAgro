import { hash } from "bcryptjs";
import { prisma } from "./../database/prisma";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => { //função para criar usuario que será exportada
  const { name, email, password, accessName } = req.body; // pegando valores do corpo da requisição

  const isUniqueEmail = await prisma.user.findUnique({  //retorna o email igual ao requisitado ou null se não existir
    where: {
      email: email, //se existir o email ele vai retornar a variavel
    },
  });

  const isAccessName = await prisma.access.findUnique({ // armazena em isAccessName o acesso em access correspondente a accesssName se existir
    where: {
      name: accessName,
    },
  });

  if (!isAccessName) { //se acesso não existir ele retorna a mensagem de erro 
    return res.status(400).json({ message: "Esse nível de acesso não existe" });
  }

  if (isUniqueEmail) { //Se email existir ele retorna o erro falando que o email já existe
    return res
      .status(400)
      .json({ message: "Já existe um usuário com esse email" });
  }

  const hashPassword = await hash(password, 8); //função de hash que vai retornar a senha encriptografada 

  const user = await prisma.user.create({ //função que cria o registro com os parametros especificados

    data: {
      name,
      email,
      password: hashPassword, //aqui é registrado apenas o hash da senha
      UserAccess:{
        create:{
          Access:{
            connect:{
              name:accessName
            }
          }
        }
      }
    },

    select: {
      id: true,
      name: true,
      email: true,
      UserAccess: {
        select: {
          Access: {
            select: {
              name: true
            }
          }
        }
      }
    }
});

  return res.json(user); // resposta retornarda
};

export const getAllUser = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select:{
      id:true,
      name:true,
      email:true,
      UserAccess:{
        select:{
          Access:{
            select:{
              name:true
            }
          }
        }
      }
    }
  });
  return res.json(users)
}

export const deleteUserMany = async (req: Request, res: Response) => {  //função para deletar um usuario
  await prisma.user.deleteMany();
  return res.json({ message: "Todos deletados" });
};
