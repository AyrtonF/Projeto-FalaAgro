import { ProductRepositoryInterface } from "../../../data/repositories/product.repository.interface";
import { StoreRepositoryInterface } from "../../../data/repositories/store.repository.inferface";
import { SaleRepositoryInterface } from "../../../data/repositories/sale.repository.interface";
import { Sale, SaleProps } from "../../models/sale.model";
import { InsufficientStockError, MissingRequiredFieldsError, ProductNotFoundError, SelfSaleError, StoreNotFoundError } from "../../../errors/errors";
import { Product } from "../../models/product.model";

export class CreateSaleUseCase {
    constructor(
        private productRepository: ProductRepositoryInterface,
        private saleRepository: SaleRepositoryInterface,
        private storeRepository: StoreRepositoryInterface
    ) {}

    async execute(input: CreateSaleInput): Promise<CreateSaleOutput> {
        if (!input.products || !input.userBuyerId || ! input.storeId ) {
            throw new MissingRequiredFieldsError("Algum ou alguns campos obrigatórios não foram fornecidos.");
        }
        const store = await this.storeRepository.findById(input.storeId)
        if(!store){
            throw new StoreNotFoundError
        }
        let userSellerId = store.userId
        const productIds = input.products.map(product => product.id);
        const productsByDatabase:Product[] = await this.productRepository.findManyByIds(productIds);
        if(productsByDatabase.length == 0){
            throw new ProductNotFoundError
        }
        let isQuatifyAmountValid = await this.productRepository.quatifyAmountValid(input.products) 
       if(!isQuatifyAmountValid){
        throw new InsufficientStockError
       }
        const productWithQuantify = productsByDatabase.map(product => {
            const foundProduct = input.products.find(p => p.id === product.id);
            
            if (!foundProduct) {
                throw new ProductNotFoundError
            }
           
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantify: foundProduct.quantify,
            };
        });
         
        
        let totalValue = productWithQuantify.reduce((total, product) => {
            return total + product.price * product.quantify;
        }, 0);
        
        if (userSellerId === input.userBuyerId) {
            throw new SelfSaleError
        }
        

        
        const saleProps: SaleProps = {
            products: productWithQuantify,
            userSellerId: userSellerId,
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
    storeId:string
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
