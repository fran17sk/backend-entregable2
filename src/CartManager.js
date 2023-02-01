import { createRequire } from 'module';
import { Cart } from './Cart.js';

const require = createRequire(import.meta.url)
const fs = require('fs');
class CartManager {
    constructor(path){
        if(!path){
            throw new Error('No se especifico el path')
        }else{
            this.path = path;
            if(fs.existsSync(path)){
                this.carrito = JSON.parse(fs.readFileSync(this.path,'utf-8'))
            }else{
                this.carrito = []
                fs.writeFileSync(this.path,JSON.stringify(this.carrito))
            }
        }
    }

    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.readFileSync(this.path,'utf-8')
                return JSON.parse(carts)
            }else{
                throw new Error('El archivo no existe')
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async createID(carritos){
        try{
            let mayor = 1
            if(carritos.length===0 ){
                return 1;
            }else{
                carritos.forEach(c => {
                    if(c.id+1 > mayor){
                        mayor = c.id+1
                    }
                });
                return mayor;
            }
        }catch{
            throw new Error("Error al crear Carrito")
        }
    }

    async createCart() {
        try{
            const carritos = await this.carrito
            const id = await this.createID(carritos)
            const NewCart = new Cart(id)
            this.carrito.push(NewCart)
            await fs.writeFileSync(this.path,JSON.stringify(this.carrito,null,'\t'))
            console.log('Carrito creado con exito...')
        }catch{
            throw new Error('Error creating cart')
        }
    }

    async getCart(id){
        const carritos = await this.getCarts()
        const index = carritos.findIndex((c)=>c.id===id)
        if(index>=0){
            return carritos[index]
        }else{
            throw new Error("Cart not found")
        }
    }

    async getIndexCart(id){
        const carritos = await this.getCarts()
        const index = carritos.findIndex((c)=>c.id===id)
        if (index>=0){
            return index
        }else{
            throw new Error("Cannot find index")
        }
    }

    async addToCart(cid,pid,cuantity){
        try{
            const carritos = await this.getCarts()
            const index = await this.getIndexCart(cid)
            if(index>=0){
                const productos = await this.#getProds();
                const productosid = productos.map((p)=>{return p.id;})
                if(productosid.includes(pid)){
                    const cart = await this.getCart(cid)
                    const product = productos.find((p)=>p.id===pid)
                    const IsInCart = cart.products.find(prod => prod.pid === pid)
                    if(IsInCart){
                        const newCart = cart.products.map( prod => {
                            if(pid===prod.pid){
                                const newCuantity = prod.cuantity + cuantity
                                return{...prod,cuantity:newCuantity}
                            }else{
                                return prod;
                            }
                        })
                        cart.products = newCart;
                    }else{
                        const newCart = {
                            pid:pid,
                            cuantity:cuantity
                        }
                        cart.products.push(newCart)
                    }
                    carritos[index]=cart
                    fs.writeFileSync(this.path,JSON.stringify(carritos))
                    return true

                }else{
                    return false
                }

            }else{
                return false
            }
        }catch{
            return false
        }

    }

    #getProds(){
        try{
            if(fs.existsSync("./files/productosprueba.json")){
                return JSON.parse(fs.readFileSync("./files/productosprueba.json",'utf-8'))
            }else{
                return []
            }
        }catch{
            throw new Error("Error al leer el archivo de productos")
        }
    }
}

export { CartManager }