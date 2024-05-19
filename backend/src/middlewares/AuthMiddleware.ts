import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { prisma } from "../data/prisma";
import { InternalServerError, SecretKeyNotProvidedError, UserNotFoundError } from "../errors/errors";
// Interface para representar o token decodificado
interface DecodedToken {
    userId: string;
    
}

// Middleware de autenticação com suporte opcional a permissões
export function authMiddleware(permissions?: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Verifica se o cabeçalho Authorization está presente
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(403).json({ message: "Token não fornecido" });
        }
        
        // Extrai o token do cabeçalho de autorização
        const token = authHeader.substring(7);

        try {
            // Verifica se a chave secreta está presente no ambiente
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
            if (!MY_SECRET_KEY) {
                throw new SecretKeyNotProvidedError;
            }

            // Decodifica o token JWT usando a chave secreta
            const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken;

            // Define o id do usuário decodificado no objeto de solicitação (req)
       
            req.user = { id: decodedToken.userId };

            // Verifica as permissões do usuário se especificadas
            if (permissions) {
                // Consulta o usuário no banco de dados para obter suas permissões
                const user = await prisma.user.findUnique({
                    where: {
                        id: decodedToken.userId
                    },
                    include: {
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

                // Extrai os nomes das permissões do usuário
                if (!user) {
                    throw new UserNotFoundError; 
                }
                const userPermissions = user?.UserAccess.map((na) => na.Access?.name) ?? [];
                // Verifica se o usuário tem pelo menos uma das permissões especificadas
                const hasPermissions = permissions.some((p) => userPermissions.includes(p));
                if (!hasPermissions) {
                    return res.status(403).json({ message: "Permissão negada" });
                }
            }

            // Se tudo estiver correto, passa para o próximo middleware ou rota
            return next();
        } catch (error) {
            // Se ocorrer algum erro na verificação do token, retorna um erro de autenticação
            if(error instanceof Error) return res.status(401).json( {error: error.message} );
            throw new InternalServerError
            
            
        }
    };
}
