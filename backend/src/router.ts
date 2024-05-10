import { signIn } from './controller/SessionController';
import { createProduct, getAllProduct,deleteAllProduct, updateProduct,getUniqueProduct, deleteUniqueProduct } from './controller/ProductController';
import { createStore, getAllStore } from './controller/StoreController';
import { createAccess, getAllAccess } from './controller/AccessController';
import { createUser,getAllUser,getUniqueUser,deleteUserMany} from './controller/UserController';
import { createSale,getAllSale,getAllSaleBySeller, getAllSaleByBuyer } from './controller/SaleController'
import { Router } from 'express';
import { authMiddleware } from './middleware/AuthMiddleware';

export const router = Router()


router.post("/user",createUser)
router.delete("/user-many",authMiddleware(["Admin"]),deleteUserMany)
router.get("/user",authMiddleware(["Admin","Vendedor","Comprador"]),getAllUser)
router.get("/user/:id",authMiddleware(["Admin","Vendedor","Comprador"]),getUniqueUser)

router.post("/access",createAccess)
router.get("/access",getAllAccess)


router.post("/store",authMiddleware(["Admin","Vendedor"]),createStore)
router.get("/store",authMiddleware(["Admin","Vendedor"]),getAllStore)

router.post("/product/:storeId",authMiddleware(["Admin","Vendedor"]),createProduct)
router.get("/product",authMiddleware(["Admin"]),getAllProduct)
router.delete("/product-many",authMiddleware(["Admin"]),deleteAllProduct)
router.delete("/product/:productId",authMiddleware(["Admin","Vendedor"]),deleteUniqueProduct)

router.put("/product/:productId",authMiddleware(["Admin","Vendedor"]),updateProduct)
router.get("/product/:productId",authMiddleware(["Admin","Vendedor","Comprador"]),getUniqueProduct)


router.post("/sale",authMiddleware(["Admin","Vendedor"]),createSale)
router.get("/sale",authMiddleware(["Admin","Vendedor"]),getAllSale)
router.get("/sale-by-seller",authMiddleware(["Admin","Vendedor"]),getAllSaleBySeller)
router.get("/sale-by-buyer",authMiddleware(["Admin","Vendedor"]),getAllSaleByBuyer)

router.post("/sign-in",signIn)

