import { Router } from "express";
import { CartManager } from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager('./src/storage/carritos.json')

router.post('/',async(req,res)=>{
    const cart = await cartManager.createCart()
    if (cart){
        return res.status(200).json({mesage:'Carrito creado con exito',carrito:cart})
    }else{
        return res.status(500).json({mesage:'Error inesperado en el servidor'})
    }
})
router.get('/:cid',async(req,res)=>{
    const { cid } = req.params
    const carrito = await cartManager.getCart(parseInt(cid))
    console.log(carrito)
    if(carrito){
        res.status(200).json({mesage:'carrito encontrado',carrito:carrito})
    }else{
        res.status(404).json({mesage:"Error carrito no encontrado"})
    }
})
router.post('/:cid/product/:pid',async(req,res)=>{
    const {cid ,pid} = req.params
    const cart = await cartManager.addToCart(parseInt(cid),parseInt(pid),1)
    if(cart){
        res.json({mesage:`Producto id: ${pid} agregado correctamente al carrito id ${cid}`}).status(200)
    }else{
        res.status(500).json({mesage:'Error al agregar producto'})
    }
})


export default router