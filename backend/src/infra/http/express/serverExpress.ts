import { userRouter } from '../../../routes/user.routes';
import { accessRouter } from '../../../routes/access.routes';
import express, {json} from 'express'

const app = express()
app.use(json())
app.use(userRouter)
app.use(accessRouter)


app.listen(3333,()=>console.log("Servidor na porta 3333"))