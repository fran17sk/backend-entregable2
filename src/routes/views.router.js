import { Router } from "express";
import { productManager } from './products.router.js'

const router = new Router();

router.get('/', async(req, res) => {
    const products = await productManager.getProducts();
    if(products.length >0){
        return res.render('home',{products})
    }else{
        return res.render('error')
    }
})

router.get('/realtimeproducts',async(req,res) =>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts',{ products, layout: "main" })
})

export default router