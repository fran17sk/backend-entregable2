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

    async getProducts(path){
        try{
            if(fs.existsSync(path)){
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

    async getproductById(path,id){
        try{
            const products = await this.getProducts(path)
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
            const index = products.findIndex((p)=>p.id===id)
            if (index) {
                products[index]={...products[index],...product}
                await fs.readFileSync(this.path,JSON.stringify(products,null,'\t'))
                console.log('Producto actualizado')
            }else{
                throw new Error('El producto no existe')
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

const productManager = new ProductManager('./productosprueba.json')

const product1 = new Product('producto prueba','Este es un producto prueba',200,"abc123",'Sin Imagen',25)
const product2 = new Product('producto prueba 2 eliminado','Este es un producto prueba 2 ',200,"abc123456",'Sin Imagen',35)
const product3 = new Product('producto prueba','Este es un producto prueba',200,"abc1235",'Sin Imagen',25)
// productManager.addProduct(product1)
productManager.addProduct(product2)
// productManager.addProduct(product3)
productManager.showProducts('./productosprueba.json')
// productManager.getproductById('./productosprueba.json',1)
// productManager.deleteProductById('./productosprueba.json',2)
// productManager.showProducts('./productosprueba.json')
