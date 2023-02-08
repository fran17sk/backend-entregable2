import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io'
import { productManager } from './routes/products.router.js'

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
app.use('/api/productos',productsRouter)
app.use('/api/carts',cartRouter)
app.use('/views',viewsRouter)

const httpServer = app.listen(8080,()=>{
    console.log('******* Ejecutando servidor *******')
    console.log('**** Escuchando al puerto 8080 ****')
})

export const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log('Uusario desconectado');
    })

    socket.on('addNewProd',async(product)=>{
        console.log(product)
        console.log( await productManager.getProducts())
        const prod = await productManager.addProduct(product)
    })
})
