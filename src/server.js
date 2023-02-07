import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')


import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
app.use('/api/productos',productsRouter)
app.use('/api/carts',cartRouter)

app.listen(8081, ()=> {
    console.log('Escuchando puerto 8081')
})