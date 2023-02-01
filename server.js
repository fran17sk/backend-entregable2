import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
app.use('/api/productos',productsRouter)
app.use('/api/carts',cartRouter)

app.listen(8081, ()=> {
    console.log('Escuchando puerto 8081')
})