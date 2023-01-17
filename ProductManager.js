import { Product } from "./Product.js"

class ProductManager {
    constructor(){
        this.products = []
    }

    getNextId(){
        const count = this.products.length
        const nextId = (count > 0) ? this.products[count - 1].id + 1 : 1; 
        return nextId;
    }

    addProduct(product){
        if(!(this.products.find((p => p.code === product.code)))){
            product['id'] = this.getNextId()
            this.products.push(product)
        }
    }

    getProducts(){
        return this.products
    }

    getproductById(id){
        if(this.products.find((p)=>p.id === id)){
            return this.products.find((p)=>p.id === id)
        }else{
            return 'no se encontro el producto'
        }
    }
}

const productManager = new ProductManager()

console.log(productManager.getProducts())

const product1 = new Product('producto prueba','Este es un producto prueba',200,"abc123",'Sin Imagen',25)

productManager.addProduct(product1)

console.log(productManager.getProducts())

const product2 = new Product('producto prueba','Este es un producto prueba',200,"abc123",'Sin Imagen',25)

productManager.addProduct(product2)

console.log(productManager.getProducts())