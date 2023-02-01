import { Router } from "express";
import { CartManager } from "../src/CartManager.js";

const router = Router();
const cartManager = new CartManager('./files/carritos.json')

router.post('/',async(req,res)=>{
    const cart = await cartManager.createCart()
    return res.status(200).json({mesage:'Carrito creado con exito'})
})
router.get('/:cid',async(req,res)=>{
    const { cid } = req.params
    const carrito = await cartManager.getCart(parseInt(cid))
    if(carrito){
        res.status(200).json({mesage:'carrito encontrado',carrito:carrito})
    }else{
        res.status(404).json({mesage:"Error carrito no encontrado"})
    }
})
router.post('/:cid/product/:pid',async(req,res)=>{
    const {cid ,pid} = req.params
    const cart = await cartManager.addToCart(parseInt(cid),parseInt(pid),1)
    res.json('hola').status(200)
})


export default router