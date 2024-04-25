import { createProduct, getAllProduct,deleteAllProduct } from './controller/ProductController';
import { createStore, getAllStore } from './controller/StoreController';
import { createAccess, getAllAccess } from './controller/AccessController';
import { createUser,getAllUser,deleteUserMany} from './controller/UserController';
import { Router } from 'express';


export const router = Router()


router.post("/user",createUser)
router.delete("/user-many",deleteUserMany)
router.get("/user",getAllUser)


router.post("/access",createAccess)
router.get("/access",getAllAccess)


router.post("/store/:userId",createStore)
router.get("/store",getAllStore)

router.post("/product/:storeId",createProduct)
router.get("/product",getAllProduct)
router.delete("/product-many",deleteAllProduct)