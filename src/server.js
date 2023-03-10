import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io'
import './db/dbConfig.js'
// import { productManager } from './routes/products.router.js'
//franciscruz991 3cxGQCZNpb4Wnyn3
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')


import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import productosRouter from './routes/productos.router.js'
// app.use('/api/productos',productsRouter)
app.use('/api/carts',cartRouter)
app.use('/views',viewsRouter)
app.use('/api/productos',productosRouter)

const PORT = process.env.PORT || 3000

const httpServer = app.listen(PORT,()=>{
    console.log('******* Ejecutando servidor *******')
    console.log(`**** Escuchando al puerto ${PORT} ****`)
})

export const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log('Uusario desconectado');
    })

    socket.on('addNewProd',async(product)=>{
        // console.log(product)
        // console.log( await productManager.getProducts())
        // const prod = await productManager.addProduct(product)
    })
})
