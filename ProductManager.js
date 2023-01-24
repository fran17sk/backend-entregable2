import { Product } from "./Product.js"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require ('fs')

class ProductManager {

    constructor(path) {
        if (!path) {
            throw new Error("No se ha especificado un archivo");
        }
        else {
            this.path = path;
            if (fs.existsSync(path)){
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
            }else{
                this.products = [] ;
                fs.writeFileSync(path,'')
            }
        }
    }
    getNextId(){
        let id = 1;
        this.products.forEach((p)=>{
            if(p.id>id){
                id = p.id
            }
        })
        return id+1
    }

    async addProduct(product){
        try{
            if(Object.values(product).includes(undefined)){
                throw new Error('El producto no tiene todas las propiedades.')
            }
            if(!(this.products.find((p => p.code === product.code)))){
                product['id'] = this.getNextId()
                this.products.push(product)
                await fs.writeFileSync(this.path, JSON.stringify(this.products,null,'\t'))
                console.log('producto creado con exito')
            }else{
                throw new Error('El producto ya existe')
            }
        }
        catch (error){
            console.log('Error : error')
        }
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.readFileSync(this.path,'utf8')
                return JSON.parse(products)
            }else{
                throw new Error('El archivo no existe')
            }
        }
        catch(error){
            console.log('El archivo no existe')
        }
    }

    async showProducts(path){
        try{
            const products = await this.getProducts(path)
            products.forEach(product => {
                console.log(JSON.stringify(product))
            });
        }
        catch(error){
            console.log(error)
        }
    }

    async getproductById(id){
        try{
            const products = await this.getProducts(this.path)
            const product = products.find((product)=>product.id===id)
            if (product){
                console.log(product)
                return product
            }else{
                throw new Error('Product not found')
                return false
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async updateProductById(path,id,product){
        try{
            const products = await this.getProducts(path)
            const find = await this.getproductById(path,id)
            const index = products.findIndex((p)=>p.id === id)
            if (find) {
                products[index]={...products[index],...product}
                fs.unlinkSync(path)
                fs.writeFileSync(path, JSON.stringify(products))
                console.log('Producto actualizado')
            }else{
                throw new Error('El id del producto no existe')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteProductById(path,id){
        try{
            const products = await this.getProducts(path);
            const product = await this.getproductById(path,id)
            if(product){
                const newproducts = products.filter((p)=>p.id!==id)
                fs.unlinkSync(path)
                fs.writeFileSync(path, JSON.stringify(newproducts))
                console.log("Archivo eliminado")
            }else{
                console.log('Error al eliminar')
            }
        }
        catch(error){
            console.log(error)
        }
    }
}


export {ProductManager}