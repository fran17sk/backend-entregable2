import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router()
export const productManager = new ProductManager('./src/storage/productos.json')

router.get('/',async(req,res)=>{
    const productos = await productManager.getProducts()
    if (req.query.limit && !isNaN(req.query.limit)) {
        const productsLimit = productos.slice(0,req.query.limit)
        return res.render('home',{productsLimit});
    }else{
        return res.render('home',{productos});
    }
}) 
router.get('/:pid',async(req,res) => {
    const productos = await productManager.getProducts()
    const productosid = productos.map((p)=>{return p.id})
    const { pid } = req.params
    if (productosid.includes(parseInt(pid)) && !isNaN(pid)) {
        const product = await productManager.getproductById(parseInt(pid))
        return res.json(product)
    }else{
        return res.status(400).json({error:'Invalid ID'})
    }
})
router.post('/',async(req,res) => {
    const obj = req.body
    if(!obj.name || !obj.description || !obj.price ||!obj.code || !obj.status ||!obj.stock || !obj.category){
        res.status(400).json('Error: Producto invalido')
    }else{
        const products = productManager.addProduct(obj)
        products
            .then(()=>{res.json({status:200,mesage:'Usuario creado con exito'})})
            .catch(()=>{res.status(500).json({mesage:'El producto ya existe'})})
        
    }
})
router.put('/:pid',async(req,res)=>{
    console.log('entrandoo')
    const { pid } = req.params
    const obj = req.body
    if(!obj.name || !obj.description || !obj.price ||!obj.code || !obj.status ||!obj.stock || !obj.category){
        res.status(400).json('Error: Producto invalido')
    }else{
        const prodEdit = productManager.updateProductById(parseInt(pid),obj)
        res.status(200).json({mesage:`Producto id: ${pid} modificado con exito...`})
    }
})

router.delete('/:pid',async(req,res) => {
    const productos = await productManager.getProducts()
    const productosid = productos.map((p)=>{return p.id})
    const { pid } = req.params
    if (productosid.includes(parseInt(pid)) && !isNaN(pid)) {
        const product = await productManager.deleteProductById(parseInt(pid))
        const productos = await productManager.getProducts()
        return res.json({mesage:'producto eliminado con exito...',productos:productos})
    }else{
        return res.status(400).json({error:'Invalid ID'})
    }
})
export default router