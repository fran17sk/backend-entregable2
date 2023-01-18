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


function prueba(){
    const productManager = new ProductManager('./productosprueba.json')
    //ADDPRODUCT
    const product2 = new Product('producto prueba 2','Este es un producto prueba 2',200,"abc12",'Sin Imagen',25)
    const product3 = new Product('producto prueba 3','Este es un producto prueba 3',300,"abc123",'Sin Imagen',35)
    const product4 = new Product('producto prueba 4','Este es un producto prueba 4',400,"abc1234",'Sin Imagen',45)
    productManager.addProduct(product2)
    productManager.addProduct(product3)
    productManager.addProduct(product4)
    productManager.showProducts('./productosprueba.json')

    // //BUSQUEDA POR ID
    // productManager.getproductById('./productosprueba.json',1) //ID=1
    // productManager.getproductById('./productosprueba.json',3) //ID=3

    // //ELIMINACION DE UN PRODUCTO POR ID
    // productManager.deleteProductById('./productosprueba.json',2) //ID=2 (PRODUCTO PRUEBA 2)
    // productManager.showProducts('./productosprueba.json')
    // //agregamos uno nuevo para verificar que no se repita el ID
    // const product5 = new Product('producto prueba 5','Este es un producto prueba 5',500,"abc12345",'Sin Imagen',55)
    // productManager.addProduct(product5)
    // productManager.showProducts('./productosprueba.json')

    // //MODIFICACION DE UN PRODUCTO POR ID
    //const newproduct3 = new Product('producto prueba 3 ACTUALIZADO','Este es un producto FUE ACTUALIZADO',3000,"abc123",'Sin Imagen',335)
    //productManager.updateProductById('./productosprueba.json',3,newproduct3)
    //productManager.showProducts('./productosprueba.json')
    
}

prueba()