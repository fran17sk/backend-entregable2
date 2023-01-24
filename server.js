import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager('./productosprueba.json')


app.get('/productos',async(req,res)=>{
    const products = await productManager.getProducts()
    if (req.query.limit && !isNaN(req.query.limit)) {
        return res.json(products.slice(0, req.query.limit));
    }else{
        return res.json(products);
    }
})
app.get('/productos/:pid',async(req,res) => {
    if (req.params.pid && !isNaN(req.params.pid)) {
    console.log(req.params.pid)
    const product = await productManager.getproductById(parseInt(req.params.pid))
    return res.json(product)
    }else{
        return res.status(400).json({error:'Invalid ID'})
    }
})
app.listen(8080, ()=> {
    console.log('Escuchando puerto 8085')
})