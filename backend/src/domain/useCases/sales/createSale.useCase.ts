import { ProductRepositoryInterface } from "../../../data/repositories/product.repository.interface";
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { Sale, SaleProps } from "../../models/sale.model";
import { MissingRequiredFieldsError } from "../../../errors/errors";
import { Product } from "../../models/product.model";

export class CreateSaleUseCase {
    constructor(
        private productRepository: ProductRepositoryInterface,
        private saleRepository: SaleRepositoryInterface
    ) {}

    async execute(input: CreateSaleInput): Promise<CreateSaleOutput> {
        if (!input.products || !input.userSellerId || !input.userBuyerId ) {
            throw new MissingRequiredFieldsError("Algum ou alguns campos obrigatórios não foram fornecidos.");
        }

        const productIds = input.products.map(product => product.id);
        const productsByDatabase:Product[] = await this.productRepository.findManyByIds(productIds);
       // console.log(input.products)
        const productWithQuantify = productsByDatabase.map(product => {
            const foundProduct = input.products.find(p => p.id === product.id);
            
            if (!foundProduct) {
                throw new Error(`Produto com ID ${product.id} não encontrado.`);
            }
            
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantify: foundProduct.quantify,
            };
        });
        // console.log(productWithQuantify)
        
        let totalValue = productWithQuantify.reduce((total, product) => {
            return total + product.price * product.quantify;
        }, 0);
        
        if (input.userSellerId === input.userBuyerId) {
            throw new Error("Não pode existir venda para si mesmo");
        }
        
        const saleProps: SaleProps = {
            products: productWithQuantify,
            userSellerId: input.userSellerId,
            userBuyerId: input.userBuyerId,
            totalValue: totalValue,
        };
        
        const saleInsert:Sale = new Sale(saleProps);
        
       let sale = await this.saleRepository.insert(saleInsert);

        for (const product of productWithQuantify) {
            await this.productRepository.updateQuantity(product.id, product.quantify);
        }

        return this.toOutput(sale);
    }

    private toOutput(sale: Sale): CreateSaleOutput {
        return {
            id: sale.id,
            products: sale.products,
            userSellerId: sale.userSellerId,
            userBuyerId: sale.userBuyerId,
            totalValue: sale.totalValue,
            buyerConfirmed: sale.buyerConfirmed,
            sellerConfirmed: sale.sellerConfirmed,
            status: sale.status,
        };
    }
}

type CreateSaleInput = {
    products: ProductSale[];
    userSellerId: string;
    userBuyerId: string;
 
};

type CreateSaleOutput = {
    id: string;
    products: ProductSale[];
    userSellerId: string;
    userBuyerId: string;
    totalValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    buyerConfirmed: boolean;
    sellerConfirmed: boolean;
    status: 'completed' | 'pending' | 'canceled';
};

type ProductSale = {
    id: string;
    quantify: number;
};
