import { Router } from "express";
import { productManager } from "./products.router.js";
const router = new Router();

router.get('/', async(req, res) => {
    const products = await productManager.getProducts();
    console.log(products)
    if(products.length > 0){
        return res.render('home',{products})
    }else{
        return res.render('error')
    }
})

router.get('/realtimeproducts',async(req,res) =>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts',{ products })
})

export default router