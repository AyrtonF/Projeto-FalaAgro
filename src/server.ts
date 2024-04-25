import { router } from './router';
import express, {json} from 'express'

const app = express()
app.use(json())
app.use(router)


app.listen(3333,()=>console.log("Servidor na porta 3333"))